exports.up = function(knex, Promise) {
  knex.schema.alterTable('orgs', orgs => {
    orgs.unique('name')
  })

  knex.schema.alterTable('roles', roles => {
    roles.unique('name')
  })

  knex.schema.alterTable('issue_status', status => {
    status.unique('name')
  })
};

exports.down = function(knex, Promise) {
  knex.schema.alterTable('orgs', orgs => {
    orgs.dropUnique('name')
  })

  knex.schema.alterTable('roles', roles => {
    roles.dropUnique('name')
  })

  knex.schema.alterTable('issue_status', status => {
    status.dropUnique('name')
  })
};
