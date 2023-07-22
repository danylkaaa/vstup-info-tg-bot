import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('offers', (table) => {
    table.integer('id').primary();
    table.integer('free_size');
    table.text('name');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('last_fetched_at').nullable();
  });

  await knex.schema.createTable('offer_applicants', (table) => {
    table.bigint('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('name').notNullable();
    table.integer('priority').notNullable();
    table.float('score');
    table.integer('offer_id');

    table
      .foreign('offer_id')
      .references('id')
      .inTable('offers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.index('offer_id');
  });

  await knex.schema.createTable('application', (table) => {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.bigint('offer_id');
    table.string('user_id');

    table
      .foreign('offer_id')
      .references('id')
      .inTable('offers')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.index('offer_id');
    table.index('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('offer_applicants');
  await knex.schema.dropTableIfExists('application');
  await knex.schema.dropTableIfExists('offers');
}
