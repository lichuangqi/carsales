import { config } from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DataSourceOptions } from 'typeorm';
import { Report } from './reports/report.entity.js';
import { User } from './users/user.entity.js';

const environment = process.env.NODE_ENV ?? 'development';

config({ path: `.env.${environment}`, quiet: true });

const database = process.env.DB_NAME;

if (!database) {
  throw new Error(`DB_NAME is not defined for NODE_ENV=${environment}`);
}

const currentDirectory = dirname(fileURLToPath(import.meta.url));

export const databaseOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database,
  entities: [User, Report],
  migrations: [join(currentDirectory, 'migrations', '*{.ts,.js}')],
  // E2E tests recreate their disposable database for every test.
  // Development and production databases must be changed through migrations.
  synchronize: environment === 'test',
};
