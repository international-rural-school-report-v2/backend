
exports.up = function(knex, Promise) {
  return knex.schema.table('issues', issues => {
    issues.timestamp('created_at', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  
    issues.timestamp('updated_at', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('issues', issues => {
    issues.dropColumn('created_at');

    issues.dropColumn('updated_at');
  })
};
