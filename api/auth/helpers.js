const jwt = require('jsonwebtoken');

const db = require('./model');

module.exports = {
  genToken,
  grabOrgRoles,
  formatOrgRoles,
}

async function genToken(user, org_roles) {
  const {id, username} = user;
  const pyld = {
    subject: id,
    username,
    org_roles
  }
  const jwtSecret = process.env.JWT_SECRET;
  const opt = {
    expiresIn: '7d',
  }
  return jwt.sign(pyld, jwtSecret, opt)
}

function grabOrgRoles(id) {
  return db.knex('user_org_roles as uor')
    .select('o.id as org_id','o.name as org_name','r.id as role_id','r.name as role_name')
    .where({user_id: id})
    .join('orgs as o', {'o.id': 'uor.org_id'})
    .join('roles as r', {'r.id': 'uor.role_id'});
}

function formatOrgRoles(rows) {
  const orgs = rows.reduce((arr, row) => {
    return !arr.includes(row.org_id)
      ? [...arr, [row.org_id, row.org_name]]
      : arr
  }, []);
  return orgs.map(org => {
    const roles = rows.reduce((arr, row) => {
      return org.org_id = row.org_id
        ? [...arr, {
            role_id: row.role_id,
            role_name: row.role_name,
          }]
        : arr;
    }, [])
    return {
      org_id: org[0],
      org_name: org[1],
      roles,
    }
  })
}
