
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE issues RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('issues').insert([
        {
          name: 'Issue 1',
          comments: 'Description here',
          org_id: 1,
          status_id: 1,
          created_by: 1,
          updated_by: 1,
        },
        {
          name: 'Issue 2',
          comments: 'Description here',
          org_id: 1,
          status_id: 2,
          created_by: 5,
          updated_by: 5,
        },
        {
          name: 'Issue 3',
          comments: 'Description here',
          org_id: 1,
          status_id: 3,
          created_by: 1,
          updated_by: 1,
        },
        {
          name: 'Issue 4',
          comments: 'Description here',
          org_id: 1,
          status_id: 4,
          created_by: 5,
          updated_by: 5,
        },
        {
          name: 'Issue 5',
          comments: 'Description here',
          org_id: 2,
          status_id: 1,
          created_by: 3,
          updated_by: 3,
        },
      ]);
    });
};
