const jwt = require('jsonwebtoken');

module.exports = {
  auth,
  onlyRoles,
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
