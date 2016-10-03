
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops_donuts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shops_donuts').insert({shop_id: 1, donut_id: 1}),
        knex('shops_donuts').insert({shop_id: 1, donut_id: 2}),
        knex('shops_donuts').insert({shop_id: 1, donut_id: 3}),
        knex('shops_donuts').insert({shop_id: 2, donut_id: 1}),
        knex('shops_donuts').insert({shop_id: 2, donut_id: 3}),
        knex('shops_donuts').insert({shop_id: 3, donut_id: 1}),
        knex('shops_donuts').insert({shop_id: 3, donut_id: 2}),
      ]);
    });
};
