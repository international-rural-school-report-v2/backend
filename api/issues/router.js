const router = require('express').Router();

const db = require('./model');

router.get('/', (req, res) => {
  const {org_roles} = req.decoded;
  const orgs = org_roles.reduce((arr, org) => [...arr, org.org_id], []);
  return db.getIssues(orgs)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve issues from the database' })
    })
})

module.exports = router;