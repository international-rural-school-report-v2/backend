const Issues = require('../basicModel')('issues');

module.exports = {
  getIssueByID,
  getIssues,
  postIssue,
  putIssue,
  delIssue,
}

const getSel = [
  'i.id', 'i.name', 'i.comments',
  'i.org_id', 'o.name as org_name',
  'i.status_id', 'is.name as status_name',
  'cb.username as created_by',
  'i.created_at',
  'ub.username as updated_by',
  'i.updated_at',
]

function getIssues(ids) {
  return Issues.knex('issues as i')
    .select(getSel)
    .whereIn('org_id', ids)
    .join('orgs as o', {'o.id': 'i.org_id'})
    .join('issue_status as is', {'is.id': 'i.status_id'})
    .join('users as cb', {'cb.id': 'i.created_by'})
    .join('users as ub', {'ub.id': 'i.updated_by'})
}

async function getIssueByID(id) {
  const res = await Issues.knex('issues as i')
    .select(getSel)
    .where({ 'i.id': id })
    .join('orgs as o', {'o.id': 'i.org_id'})
    .join('issue_status as is', {'is.id': 'i.status_id'})
    .join('users as cb', {'cb.id': 'i.created_by'})
    .join('users as ub', {'ub.id': 'i.updated_by'})
    .first()
  return !!res ? res : '';
}

async function postIssue(issue, created_by, org_id) {
  issue = { ...issue, org_id, created_by, updated_by: created_by }
  await Issues.postID(issue);
  return getIssues([org_id]);
}

async function putIssue(id, changes, updated_by, org_id) {
  const updated_at = new Date().toISOString();
  changes = {...changes, updated_by, updated_at }
  await Issues.putNum(id, changes);
  return getIssues([org_id]);
}

async function delIssue(id, org_id) {
  const count = await Issues.delNum(id);
  const arr = await getIssues([org_id]);
  return arr.length ? arr : count;
}
