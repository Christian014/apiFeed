/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('publish', function (table) {

    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('text').notNullable();
    table.foreign('user_id').references('id').inTable('users');
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('publish');
};
