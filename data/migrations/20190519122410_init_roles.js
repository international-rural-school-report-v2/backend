exports.up = function(knex) {
  return knex.schema.createTable('roles', roles => {
    roles.increments();

    roles.string('name')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles');
};
