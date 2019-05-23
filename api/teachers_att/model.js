const teachersAtt = require('../basicModel')('teachersAtt');

const getTeachersAttData = () => {
  return teachersAtt('user_settings')
    .select('*')
    .orderBy('date', 'desc');;
};

module.exports = { getTeachersAttData }