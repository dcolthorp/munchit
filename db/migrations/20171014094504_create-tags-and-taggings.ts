import * as Knex from "knex";

exports.up = async function(knex: Knex) {
  await knex.schema.createTable("tags", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
  });

  await knex.schema.createTable("taggings", table => {
    table.increments("id");
    table
      .integer("snackId")
      .notNullable()
      .index();
    table
      .foreign("snackId")
      .references("snacks.id")
      .onDelete("CASCADE");
    table
      .integer("tagId")
      .notNullable()
      .index();
    table
      .foreign("tagId")
      .references("tags.id")
      .onDelete("CASCADE");
  });
};

exports.down = async function(knex: Knex) {
  await knex.schema.dropTable("taggings");
  await knex.schema.dropTable("tags");
};
