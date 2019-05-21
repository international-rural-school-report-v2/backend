const router = require('express').Router();

const db = require('./model');

router.get('/', (req, res) => {
  const {org_roles} = req.decoded;
  const orgs = org_roles.map(org => org.org_id);
  return db.getIssues(orgs)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve issues from the database' })
    })
})

router.post('/', (req, res) => {
  let issue = req.body;
  const {subject} = req.decoded;
  // const {org_roles} = req.decoded;
  // const orgs = org_roles.map(org => org.org_id);
  // const thisOrg = org_roles.filter(obj => `${obj.org_id}` === org_id)
  // console.log(thisOrg)
  return db.postIssue(issue, subject)
    .then(issues => {
      console.log('BAR')
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create the new issue' })
    })
})

router.get('/org/:org_id', (req, res) => {
  const {org_id} = req.params;
  // const {org_roles} = req.decoded;
  // const orgs = org_roles.map(org => org.org_id);
  // if(orgs.includes(org_id))
  return db.getIssues([org_id])
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve issues from the database' })
    })
})

router.post('/org/:org_id', (req, res) => {
  const {org_id} = req.params;
  let issue = req.body;
  issue = { ...issue, org_id };
  const {subject} = req.decoded;
  // const {org_roles} = req.decoded;
  // const orgs = org_roles.map(org => org.org_id);
  // const thisOrg = org_roles.filter(obj => `${obj.org_id}` === org_id)
  // console.log(thisOrg)
  return db.postIssue(issue, subject)
    .then(issues => {
      console.log('BAR')
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create the new issue' })
    })
})

module.exports = router;
