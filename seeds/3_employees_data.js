
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('employees').insert({first_name: 'tim', last_name: 'chew', shop_id: 1, favorite_donut: 2}),
        knex('employees').insert({first_name: 'taylor', last_name: 'king', shop_id: 2, favorite_donut: 1}),
        knex('employees').insert({first_name: 'sam', last_name: 'spillman', shop_id: 3, favorite_donut: 3}),
      ]);
    });
};
