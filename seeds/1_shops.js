
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shops').insert({id: 1, name: 'Taylors World', city: 'Austin'}),
        knex('shops').insert({id: 2, name: 'Joeys World', city: 'Canada'}),
        knex('shops').insert({id: 3, name: 'Franks World', city: 'Hutto'}),
      ]);
    });
};
