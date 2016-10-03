
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donuts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('donuts').insert({id: 1, name: 'biggie', topping: 'glazed', price: 3}),
        knex('donuts').insert({id: 2, name: 'smallie', topping: 'chocolate', price: 1}),
        knex('donuts').insert({id: 3, name: 'mediumie', topping: 'sprinkles', price: 2}),
      ]);
    });
};
