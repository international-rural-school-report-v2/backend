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
  const {subject, org_roles} = req.decoded;
  const {org_id} = org_roles[0];
  return db.postIssue(issue, subject, org_id)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create the new issue' })
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  return db.getIssueByID({id})
    .then(issue => {
      res.status(200).json(issue);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not retrieve the issue with an id of ${id}` })
    })
})

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const issue = req.body;
  const {subject, org_roles} = req.decoded;
  const {org_id} = org_roles[0];
  return db.putIssue(id, issue, subject, org_id)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not edit the issue with an id of ${id}` })
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const {org_roles} = req.decoded;
  const {org_id} = org_roles[0];
  return db.delIssue(id, org_id)
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not edit the issue with an id of ${id}` })
    })
})

router.get('/org/:org_id', (req, res) => {
  const {org_id} = req.params;
  return db.getIssues([org_id])
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve issues from the database' })
    })
})

module.exports = router;
