const db = require('../../data/dbConfig.js')

const getTeachersAttData = () => {
  return db('teach_att')
    .select('*')
    .orderBy('date', 'desc');;
};

module.exports = { getTeachersAttData }