const Issues = require('../basicModel')('issues');

module.exports = {
  getIssues,
}

async function getIssues(arr) {
  const sel = [
    'i.id', 'i.name', 'i.comments',
    'i.org_id', 'o.name as org_name',
    'i.status_id', 'is.name as status_name',
    'cb.username as created_by',
    'i.created_at',
    'ub.username as updated_by',
    'i.updated_at',
  ]
  return Issues.knex('issues as i')
    .select(sel)
    .whereIn('org_id', arr)
    .join('orgs as o', {'o.id': 'i.org_id'})
    .join('issue_status as is', {'is.id': 'i.status_id'})
    .join('users as cb', {'cb.id': 'i.created_by'})
    .join('users as ub', {'ub.id': 'i.updated_by'})
}
