/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pizzas').del()
    .then(function () {
      // Inserts seed entries
      return knex('pizzas').insert([
        { name: 'Pizza 1'},
        { name: 'Pizza 2'},
        { name: 'Pizza 3'},
        { name: 'Pizza 4'},
      ]);
    });
};
