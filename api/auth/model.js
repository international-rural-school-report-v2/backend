const tbl = 'users';
const basic = require('../basicModel')(tbl);

module.exports = {
  knex: basic.knex,
  login: basic.get,
}

