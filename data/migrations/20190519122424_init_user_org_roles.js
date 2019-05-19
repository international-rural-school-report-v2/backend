exports.up = function(knex) {
  return knex.schema.createTable('user_org_roles', uor => {
    uor.increments();

    uor.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    uor.integer('org_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('orgs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    uor.integer('role_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    uor.unique(['user_id', 'org_id', 'role_id'])
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_org_roles');
};
