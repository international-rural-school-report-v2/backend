const tbl = 'users';
const Users = require('../basicModel')(tbl);
const UOR = require('../basicModel')('user_org_roles');

module.exports = {
  knex: Users.knex,
  login: Users.get,
  register,
}

async function register(user) {
  const { username, password, name, phone, email, org_id, role_id  } = user;
  const tblUsers = {
    username,
    password,
    name,
    phone,
    email,
  }
  const created = await Users.postEntry(tblUsers);
  const user_id = created[0].id;
  const tblUOR = { user_id, org_id, role_id }
  await UOR.postEntry(tblUOR);
  return created[0];
}
