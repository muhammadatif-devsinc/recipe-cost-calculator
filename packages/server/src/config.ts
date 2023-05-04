import * as dotenv from 'dotenv';
import path from 'path';

export const AppEnvironment = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${AppEnvironment}`)
});

export const AppWhiteListedDomains: string[] = AppEnvironment === 'production'
  ? []
  : [String(process.env.RCC_CLIENT_DEV_ORIGIN)];

export const AppDatabaseConfig = {
  database: process.env.RCC_TYPEORM_DATABASE ?? 'rcc_local',
  username: process.env.RCC_TYPEORM_USERNAME ?? 'dev',
  port: Number(process.env.RCC_TYPEORM_PORT) ?? 5432,
  host: process.env.RCC_TYPEORM_HOST ?? 'localhost',
  password: process.env.RCC_TYPEORM_PASSWORD
};

export const AppServerPort = 8081;
