exports.up = function(knex) {
  return knex.schema
    .createTable('items', items => {
        items.increments('id')
        items.string('item_name', 64).notNullable().unique()
        items.string('item_description', 255).notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('items');
};
