const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE user_org_roles RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('user_org_roles').insert([
        {
          user_id: 1,
          org_id: 1,
          role_id: 1,
        },
        {
          user_id: 2,
          org_id: 1,
          role_id: 2,
        },
        {
          user_id: 3,
          org_id: 2,
          role_id: 1,
        },
        {
          user_id: 4,
          org_id: 2,
          role_id: 2,
        },
        {
          user_id: 5,
          org_id: 1,
          role_id: 1,
        },
        {
          user_id: 6,
          org_id: 3,
          role_id: 1,
        }
      ]);
    });
};
