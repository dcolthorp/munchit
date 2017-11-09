import * as Knex from "knex";

exports.seed = async function(knex: Knex) {
  // Deletes ALL existing entries
  await knex("tags").del();
  const tagIds = await knex("tags")
    .insert([
      { name: "Go-to" },
      { name: "Vegan" },
      { name: "Vegetarian" },
      { name: "Divisive" },
      { name: "Gluten-free" },
      { name: "Expensive" }
    ])
    .returning("id");

  await knex("snacks").del();
  const snackIds = await knex("snacks")
    .insert([{ name: "Cauliflower" }, { name: "Cheese" }])
    .returning("id");

  await knex("taggings").insert([
    { snackId: snackIds[0], tagId: tagIds[1] },
    { snackId: snackIds[0], tagId: tagIds[3] },
    { snackId: snackIds[1], tagId: tagIds[0] }
  ]);
};
