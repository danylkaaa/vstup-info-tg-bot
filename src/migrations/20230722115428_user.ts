import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('telegram_clients', (table) => {
    table.bigint('telegram_id').primary();
    table.string('user_id');
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('telegram_clients');
  await knex.schema.dropTableIfExists('users');
}
