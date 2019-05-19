const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('user_org_roles').truncate()
    .then(function () {
      return knex('user_org_roles').insert([
        // User1
        {
          id: 1,
          user_id: 1,
          org_id: 1,
          role_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          org_id: 1,
          role_id: 2,
        },
        {
          id: 3,
          user_id: 1,
          org_id: 2,
          role_id: 1,
        },
        {
          id: 4,
          user_id: 1,
          org_id: 2,
          role_id: 2,
        },
        // User2
        {
          id: 5,
          user_id: 2,
          org_id: 1,
          role_id: 1,
        },
        {
          id: 6,
          user_id: 2,
          org_id: 2,
          role_id: 2,
        },
        // User3
        {
          id: 7,
          user_id: 3,
          org_id: 1,
          role_id: 1,
        },
        // User4
        {
          id: 8,
          user_id: 4,
          org_id: 2,
          role_id: 2,
        }
      ]);
    });
};
