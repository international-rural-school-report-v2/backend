exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('roles').insert([
        {
          name: 'School Administrator'
        },
        {
          name: 'Board Member'
        },
      ]);
    });
};
