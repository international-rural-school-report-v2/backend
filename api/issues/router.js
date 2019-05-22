const router = require('express').Router();

const db = require('./model');

router.get('/', (req, res) => {
  const {org_roles} = req.decoded;
  const orgs = org_roles.map(org => org.org_id);
  return db.getIssues(orgs)
    .then(issues => {
      !!issues.length
        ? res.status(200).json(issues)
        : res.status(404).json({ error: 'No issues exist in our database for your organization(s)' });
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
      !!issue
        ? res.status(200).json(issue)
        : res.status(404).json({ error: `An issue with ID ${id} does not exist in our database` });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not retrieve the issue with ID ${id}` })
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
      res.status(500).json({ error: `Could not edit the issue with ID ${id}` })
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const {org_roles} = req.decoded;
  const {org_id} = org_roles[0];
  return db.delIssue(id, org_id)
    .then(issues => {
      Array.isArray(issues)
        ? res.status(200).json(issues)
        : !!issues
          ? res.status(200).json({ message: `The item with ID ${id} was successfully deleted, but no more issues exist for you` })
          : res.status(404).json({ error: `An issue with ID ${id} does not exist in our database` })
    })
    .catch(err => {
      res.status(500).json({ error: `Could not edit the issue with ID ${id}` })
    })
})

router.get('/org/:org_id', (req, res) => {
  const {org_id} = req.params;
  return db.getIssues([org_id])
    .then(issues => {
      !!issues.length
        ? res.status(200).json(issues)
        : res.status(404).json({ error: `No issues exist in our database with organization ID ${org_id}` });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not retrieve issues from the database with organization ID ${org_id}` })
    })
})

module.exports = router;
