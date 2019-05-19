exports.up = function(knex) {
  return knex.schema.createTable('orgs', orgs => {
    orgs.increments();

    orgs.string('name')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orgs');
};
