exports.up = function(knex, Promise) {
  return knex.schema.createTable("snacks", table => {
    table.increments();
    table.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("snacks");
};
