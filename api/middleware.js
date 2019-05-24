const jwt = require('jsonwebtoken');
const Issues = require('./issues/model');

module.exports = {
  auth,
  reqFields,
  orgCheckIssue,
  orgCheckParam,
  stripIssueBody,
  onlyRoles,
  statusPrevent,
}

function auth(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.headers.authorization;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(!err) {
      req.user_id = decoded.subject;
      req.username = decoded.username;
      // req.org_roles = decoded.org_roles; // For greater flexibility
      // req.orgs = decoded.org_roles.map(org => org.org_id); // Also for greater flexibility
      req.org_id = decoded.org_roles[0].org_id;
      req.role_id = decoded.org_roles[0].roles[0].role_id;
      next();
    } else {
      res.status(403).json({ error: 'You do not have permission to access this data' })
    }
  })
}

function reqFields(fields) {
  return (req, res, next) => {
    const missing = fields
      .filter(prop => !Object.keys(req.body).includes(prop))
      .join(', ');
    !!missing.length
      ? res.status(400).json({ error: `Your request is missing the following required fields: ${missing}`})
      : next();
  }
}

async function orgCheckIssue(req, res, next) {
  const {id} = req.params;
  const {org_id} = req;
  const issue = await Issues.getIssueByID(id);
  if(!issue) {
    return res.status(404).json({ error: `An issue with ID ${id} does not exist in our database` })
  }
  issue.org_id !== org_id
    ? res.status(403).json({ error: `You are not permitted to make this request on the issue with ID ${id}` })
    : next();
}

function orgCheckParam(req, res, next) {
  `${req.org_id}` === req.params.org_id
    ? next()
    : res.status(403).json({ error: `You are not permitted to make this request on the organization with ID ${req.params.org_id}` })
}

function stripIssueBody(allowed = ['name', 'comments', 'status_id', 'org_id']) {
  return (role_fields) => {
    return (req, res, next) => {
      const {role_id} = req;
      if(!!role_fields && !!role_fields[role_id]) {
        const fields = role_fields[role_id];
        const flagged = Object.keys(req.body)
          .filter(prop => !fields.includes(prop))
          .join(', ')
        if (!!flagged.length) {
          return res.status(400).json({
            error: `You are not permitted to submit any of the following fields in the body of this request: ${flagged}`
          })
        }
      }
      req.body = Object.keys(req.body)
        .filter(prop => allowed.includes(prop))
        .reduce((newBody, prop) => {
          newBody[prop] = req.body[prop];
          return newBody 
        }, {})
      next();
    }
  }
}

function onlyRoles(roles) {
  return (req, res, next) => {
    roles.includes(req.role_id)
      ? next()
      : res.status(403).json({ error: 'You are not permitted to complete this action' })
    
    // // For handling multiple roles at multiple orgs
    // const {org_roles} = req;
    // const orgs = org_roles.reduce((arr, org) => {
    //   const valid = org.roles.filter(role => roles.includes(role));
    //   !!valid.length
    //     ? [...arr, org.id]
    //     : arr;
    // }, []);
    // if(!!orgs.length) {
    //   req.orgs = orgs;
    //   next();
    // } else {
    //   res.status(403).json({ error: 'You are not permitted to complete this action' })
    // }
  }
}

function statusPrevent(statuses) {
  return async (req, res, next) => {
    const {id} = req.params;
    const issue = await Issues.getIssueByID(id);
    statuses.includes(issue.status_id)
      ? res.status(403).json({ error: `This request cannot be executed on an issue whose status is ${issue.status_name}` })
      : next();
  }
}
