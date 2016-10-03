
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shops', function (table) {
    table.increments();
    table.string('name');
    table.string('city');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shops');
};
