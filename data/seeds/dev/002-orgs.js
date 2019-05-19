exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE orgs CASCADE')
    .then(function () {
      return knex('orgs').insert([
        {
          id: 1,
          name: 'Organization One'
        },
        {
          id: 2,
          name: 'Organization Two'
        }
      ]);
    });
};
