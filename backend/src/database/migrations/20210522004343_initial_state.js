
exports.up = function(knex) {
  return knex.schema.createTable('file',function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.integer('size').notNullable();
    table.string('key').notNullable();
    table.string('url').notNullable();
    table.string('createAt').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('file');
};
