const faker = require('faker');

// For loop to generate number of teachers
const generateSeeds = () => {
  const numOfTeachers = 50;
  let arr = [];
  // prettier-ignore
  for (let i = 0; i < numOfTeachers; i++) {
    arr.push({
      name: faker.name.findName(),
      date: Date.parse(
        faker.date.between(
          new Date(Date.now() - (1000 * 60 * 60 * 24 * 2)), // from 2 days ago
          new Date(Date.now() - (1000 * 60 * 60 * 6)) // to 6 hours ago
        )
      ),
      in: faker.random.number({ min: 1, max: 24 }),
      out: faker.random.number({ min: 1, max: 24 }),
      tmm: faker.random.number({ min: 40, max: 99 })
    });
  }
  return arr;
}

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries for users table
  return knex.raw('TRUNCATE TABLE teach_att RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('teach_att').insert(generateSeeds());
    });
};