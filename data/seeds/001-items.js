
exports.seed = async function(knex) {
  await knex('items').truncate();
  await knex('items').insert([
    {
      id: 0,
      item_name: 'Cereal',
      item_description: 'Very good cereal, full of sugar!'
    },
    {
      id: 1,
      item_name: 'Instant Brown Rice',
      item_description: 'Cook this rice in 60 seconds, or less, just add water!'
    }
  ])
};
