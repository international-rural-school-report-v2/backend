const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('users').insert([
        {
          username: 'user1',
          password: bcrypt.hashSync('password', 12),
          name: 'User One',
          phone: '555-867-5309',
          email: 'user1@org1.com',
        },
        {
          username: 'user2',
          password: bcrypt.hashSync('password', 12),
          name: 'User Two',
          phone: '555-867-5310',
          email: 'user2@org1.com',
        },
        {
          username: 'user3',
          password: bcrypt.hashSync('password', 12),
          name: 'User Three',
          phone: '555-867-5311',
          email: 'user3@org2.com',
        },
        {
          username: 'user4',
          password: bcrypt.hashSync('password', 12),
          name: 'User Four',
          phone: '555-867-5312',
          email: 'user4@org2.com',
        },
        {
          username: 'user5',
          password: bcrypt.hashSync('password', 12),
          name: 'User Five',
          phone: '555-867-5313',
          email: 'user5@org1.com',
        },
        {
          username: 'user6',
          password: bcrypt.hashSync('password', 12),
          name: 'User Six',
          phone: '555-867-5314',
          email: 'user6@org3.com',
        },
      ]);
    });
};
