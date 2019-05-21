const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('./model');
const {genToken, grabOrgRoles, formatOrgRoles} = require('./helpers');

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  db.login({username})
    .then(async user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const grabbed = await grabOrgRoles(user.id);
        const org_roles = formatOrgRoles(grabbed);
        const token = await genToken(user, org_roles);
        res.status(201).json({token, org_roles});
      } else {
        res.status(401).json({
          error: 'Invalid username and/or password'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not check credentials against the user database'
      });
    });
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  db.register(user)
  .then(async created => {
    const token = await genToken(created);
    const grabbed = await grabOrgRoles(created.id);
    const org_roles = formatOrgRoles(grabbed);
    res.status(201).json({token, org_roles});
  })
  .catch(err => {
    res.status(500).json({
      error: 'Could not create the new user'
    });
  });
})

module.exports = router;
