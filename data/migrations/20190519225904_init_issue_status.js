exports.up = function(knex, Promise) {
  return knex.schema.createTable('issue_status', status => {
    status.increments();

    status.string('name')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('issue_status');
};
