exports.up = function(knex, Promise) {
  return knex.schema.table('issues', issues => {
    issues.dropTimestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('issues', issues => {
    issues.timestamps(true, true);
  })
};
