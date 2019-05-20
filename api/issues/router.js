const router = require('express').Router();

const db = require('./model');

router.get('/', (req, res) => {
  const {department} = req.decoded;
  const retrieve = department === 'admin'
    ? db.get('', ['id','username', 'department'])
    : db.get({department}, ['id','username','department']);
  return retrieve
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve from the users database.' })
    });
})

module.exports = router;