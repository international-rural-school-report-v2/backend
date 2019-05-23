exports.up = function (knex, Promise) {
  return knex.schema.createTable('teach_att', teach_att => {
    teach_att.increments();

    teach_att.string('name')
      .notNullable();

    teach_att.bigInteger('date')
      .notNullable();

    teach_att.integer('in')
      .notNullable();

    teach_att.integer('out')
      .notNullable();

    teach_att.integer('tmm')
      .notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('teach_att');
};
