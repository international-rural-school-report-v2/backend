exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE issue_status RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('issue_status').insert([
        {
          name: 'Done'
        },
        {
          name: 'Scheduled'
        },
        {
          name: 'Open'
        },
        {
          name: 'Ignored'
        },
      ]);
    });
};
