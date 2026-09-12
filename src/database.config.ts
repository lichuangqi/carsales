import { config } from 'dotenv';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DataSourceOptions } from 'typeorm';
import { Report } from './reports/report.entity.js';
import { User } from './users/user.entity.js';

const environment = process.env.NODE_ENV ?? 'development';

config({ path: `.env.${environment}`, quiet: true });

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const entities = [User, Report];
const migrations = [join(currentDirectory, 'migrations', '*{.ts,.js}')];

function createDatabaseOptions(): DataSourceOptions {
  if (environment === 'production') {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined for production');
    }

    return {
      type: 'postgres',
      url: databaseUrl,
      ssl: {
        rejectUnauthorized: true,
      },
      entities,
      migrations,
      synchronize: false,
    };
  }

  const database = process.env.DB_NAME;

  if (!database) {
    throw new Error(`DB_NAME is not defined for NODE_ENV=${environment}`);
  }

  return {
    type: 'better-sqlite3',
    database,
    entities,
    migrations,
    // E2E tests recreate their disposable database for every test.
    // Development databases must be changed through migrations.
    synchronize: environment === 'test',
  };
}

export const databaseOptions = createDatabaseOptions();
