const Orgs = require('../basicModel')('orgs');
const Roles = require('../basicModel')('roles');
const Status = require('../basicModel')('issue_status');

module.exports = {
  getOrgs: Orgs.getArr,
  getRoles: Roles.getArr,
  getStatus: Status.getArr,
}