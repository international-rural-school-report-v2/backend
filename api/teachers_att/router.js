const router = require('express').Router();

const db = require('./model.js');

router.get('/', (req, res) => {
  db.getTeachersAttData()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not retrieve the list of teachers from the database',
        details: err
      })
    })
})

module.exports = router;
