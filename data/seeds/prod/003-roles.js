exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE roles CASCADE')
    .then(function () {
      return knex('roles').insert([
        {
          id: 1,
          name: 'School Administrator'
        },
        {
          id: 2,
          name: 'Board Member'
        },
      ]);
    });
};
