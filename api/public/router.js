const router = require('express').Router();

const db = require('./model');

router.get('/orgs', (req, res) => {
  db.getOrgs()
    .then(orgs => {
      !!orgs.length
        ? res.status(200).json(orgs)
        : res.status(404).json({ error: 'No organizations currently exist in our database' });
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not retrieve the list of organizations from the database'
      })
    })
})

router.get('/roles', (req, res) => {
  db.getRoles()
    .then(roles => {
      !!roles.length
        ? res.status(200).json(roles)
        : res.status(404).json({ error: 'No roles currently exist in our database' });
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not retrieve the list of roles from the database'
      })
    })
})

router.get('/issue-status', (req, res) => {
  db.getStatus()
    .then(issue_status => {
      !!issue_status
        ? res.status(200).json(issue_status)
        : res.status(404).json({ error: 'No issue statuses currently exist in our database' });
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not retrieve the list of issue statuses from the database'
      })
    })
})

module.exports = router;
