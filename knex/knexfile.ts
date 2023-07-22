import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config({ path: '../.env' });

export default {
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
    port: +process.env.PG_PORT,
    host: process.env.DB_HOST,
  },
  migrations: {
    extension: 'ts',
    directory: '../src/migrations',
  },
} as Knex.Config;
