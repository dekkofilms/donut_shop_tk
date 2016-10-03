
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('employees', function (table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.integer('shop_id').unsigned();
    table.foreign('shop_id').references('shops.id').onDelete('CASCADE');
    table.integer('favorite_donut').unsigned();
    table.foreign('favorite_donut').references('donuts.id').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('employees');
};
