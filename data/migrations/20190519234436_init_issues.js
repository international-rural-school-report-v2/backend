exports.up = function(knex, Promise) {
  return knex.schema.createTable('issues', issues => {
    issues.increments();

    issues.string('name')
      .notNullable();

    issues.text('comments');

    issues.integer('org_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('orgs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    issues.integer('status_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('issue_status')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      
    issues.integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    issues.integer('updated_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  
    issues.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('issues');
};
