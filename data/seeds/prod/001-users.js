const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          username: 'user1',
          password: bcrypt.hashSync('password', 12),
          name: 'User One',
          phone: '555-867-5309',
          email: 'user1@something.com',
        },
        {
          id: 2,
          username: 'user2',
          password: bcrypt.hashSync('password', 12),
          name: 'User Two',
          phone: '555-867-5310',
          email: 'user2@something.com',
        },
        {
          id: 3,
          username: 'user3',
          password: bcrypt.hashSync('password', 12),
          name: 'User Three',
          phone: '555-867-5311',
          email: 'user3@something.com',
        },
        {
          id: 4,
          username: 'user4',
          password: bcrypt.hashSync('password', 12),
          name: 'User Four',
          phone: '555-867-5312',
          email: 'user4@something.com',
        },
        {
          id: 5,
          username: 'user5',
          password: bcrypt.hashSync('password', 12),
          name: 'User Five',
          phone: '555-867-5313',
          email: 'user5@something.com',
        },
      ]);
    });
};
