const Orgs = require('../basicModel')('orgs');
const Roles = require('../basicModel')('roles');

module.exports = {
  getOrgs: Orgs.getArr,
  getRoles: Roles.getArr,
}