const Issues = require('../basicModel')('issues');

module.exports = {
  getIssueByID: Issues.get,
  getIssues,
  postIssue,
  putIssue,
}

function getIssues(ids) {
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
    .whereIn('org_id', ids)
    .join('orgs as o', {'o.id': 'i.org_id'})
    .join('issue_status as is', {'is.id': 'i.status_id'})
    .join('users as cb', {'cb.id': 'i.created_by'})
    .join('users as ub', {'ub.id': 'i.updated_by'})
}

async function postIssue(issue, created_by) {
  const { org_id } = issue;
  issue = { ...issue, created_by, updated_by: created_by }
  await Issues.postID(issue);
  return getIssues([org_id]);
}

async function putIssue(id, changes, updated_by, org_id) {
  const updated_at = new Date().toISOString();
  changes = {...changes, updated_by, updated_at }
  await Issues.putEntry(id, changes);
  return getIssues([org_id]);
}
