const router = require('express').Router();

const db = require('./model');

router.get('/orgs', (req, res) => {
  db.getOrgs()
    .then(orgs => {
      res.status(200).json(orgs);
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
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not retrieve the list of roles from the database'
      })
    })
})

module.exports = router;
