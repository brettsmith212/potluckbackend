exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("potluck", (potluck) => {
      potluck.increments("potluck_id");
      potluck.date("date").notNullable();
      potluck.time("time").notNullable();
      potluck.string("location", 128).notNullable();
    })
    .createTable("guests", (guests) => {
      guests.increments("guest_id");
      guests.string("guest_name", 128).notNullable();
      guests
        .integer("potluck_id")
        .unsigned()
        .references("potluck_id")
        .inTable("potluck")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("items", (items) => {
      items.increments("items_id");
      items.string("item_name", 128).notNullable();
      items
        .integer("guest_id")
        .unsigned()
        .references("guest_id")
        .inTable("guests")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("guests")
    .dropTableIfExists("potluck")
    .dropTableIfExists("users");
};
