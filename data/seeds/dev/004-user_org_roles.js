const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE user_org_roles CASCADE')
    .then(function () {
      return knex('user_org_roles').insert([
        // User1
        {
          user_id: 1,
          org_id: 1,
          role_id: 1,
        },
        {
          user_id: 1,
          org_id: 1,
          role_id: 2,
        },
        {
          user_id: 1,
          org_id: 2,
          role_id: 1,
        },
        {
          user_id: 1,
          org_id: 2,
          role_id: 2,
        },
        // User2
        {
          user_id: 2,
          org_id: 1,
          role_id: 1,
        },
        {
          user_id: 2,
          org_id: 2,
          role_id: 2,
        },
        // User3
        {
          user_id: 3,
          org_id: 1,
          role_id: 1,
        },
        // User4
        {
          user_id: 4,
          org_id: 2,
          role_id: 2,
        }
      ]);
    });
};
