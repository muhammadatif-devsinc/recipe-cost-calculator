import * as dotenv from 'dotenv';
import path from 'path';

export const AppEnvironment = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${AppEnvironment}`)
});

export const AppDatabaseConfig = {
  database: process.env.TYPEORM_DATABASE ?? 'rcc_local',
  username: process.env.TYPEORM_USERNAME ?? 'dev',
  port: Number(process.env.TYPEORM_PORT) ?? 5432,
  host: process.env.TYPEORM_HOST ?? 'localhost',
  password: process.env.TYPEORM_PASSWORD
};

export const AppServerPort = 8081;
