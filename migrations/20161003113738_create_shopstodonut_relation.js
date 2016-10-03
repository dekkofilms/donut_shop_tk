
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shops_donuts', function (table) {
    table.increments();
    table.integer('shop_id').unsigned();
    table.foreign('shop_id').references('shops.id').onDelete('CASCADE');
    table.integer('donut_id').unsigned();
    table.foreign('donut_id').references('donuts.id').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shops_donuts');
};
