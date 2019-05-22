const db = require('../data/dbConfig');

module.exports = function(tbl) {
  return {
    knex: db,
    get: function(val, sel=['*']) {
      return val
        ? db(tbl).select(sel).where(val).first()
        : db(tbl).select(sel);
    },
    getArr: function(val, sel=['*']) {
      return val
        ? db(tbl).select(sel).where(val)
        : db(tbl).select(sel);
    },
    postID: function(entry) {
      return db(tbl).insert(entry)
        .returning('id');
    },
    postEntry: function(entry) {
      return db(tbl).insert(entry)
        .returning('*');
    },
    putNum: function(id, changes) {
      return db(tbl).where({id}).update(changes);
    },
    putEntry: function(id, changes) {
      return db(tbl).where({id}).update(changes)
        .returning('*');
    },
    delNum: function(id) {
      return db(tbl).where({id}).del();
    },
    delEntry: function(id) {
      return db(tbl).where({id}).del()
        .returning('*');
    },
  }
}
