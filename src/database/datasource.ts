import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

dotenv.config({ path: `.env.stage.${process.env.STAGE || 'dev'}` });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsTableName: 'migration_table',
});
