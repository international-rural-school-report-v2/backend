exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE orgs RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('orgs').insert([
        {
          name: 'Organization One'
        },
        {
          name: 'Organization Two'
        },
        {
          name: 'Organization Three'
        }
      ]);
    });
};
