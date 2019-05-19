const jwt = require('jsonwebtoken');

const db = require('./model');

module.exports = {
  genToken,
  grabOrgRoles,
}

async function genToken(user) {
  const {id, username} = user;
  const pyld = {
    subject: id,
    username
  }
  const jwtSecret = process.env.JWT_SECRET;
  const opt = {
    expiresIn: '2hr',
  }
  return jwt.sign(pyld, jwtSecret, opt)
}

async function grabOrgRoles(id) {
  const rows = await db.knex('user_org_roles as uor')
    .select('o.name as org','r.name as role')
    .where({user_id: id})
    .join('orgs as o', {'o.id': 'uor.org_id'})
    .join('roles as r', {'r.id': 'uor.role_id'})
    .orderBy('org');
  return rows.reduce((obj, row) => {
    if(Object.keys(obj).includes(row.org)) {
      obj[row.org].push(row.role);
      return obj;
    } else {
      obj[row.org] = [row.role];
      return obj;
    }
  }, {});
}
