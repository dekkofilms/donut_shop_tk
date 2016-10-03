
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('donuts', function (table) {
    table.increments();
    table.string('name');
    table.string('topping');
    table.integer('price');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('donuts');
};
