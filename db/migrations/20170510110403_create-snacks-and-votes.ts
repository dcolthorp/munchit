import * as Knex from "knex";

exports.up = async function(knex: Knex) {
  await knex.schema.createTable("snacks", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
  });
  await knex.schema.createTable("votes", table => {
    table.increments("id");
    table.integer("snackId").notNullable();
    table.foreign("snackId").references("snacks.id");
    table
      .dateTime("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex: Knex) {
  return knex.schema
    .dropTable("votes")
    .then(() => knex.schema.dropTable("snacks"));
};
