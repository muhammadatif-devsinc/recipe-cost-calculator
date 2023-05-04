import { AppDatabaseConfig, AppEnvironment } from '../config';
import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: AppDatabaseConfig.host,
  port: AppDatabaseConfig.port,
  username: AppDatabaseConfig.username,
  password: AppDatabaseConfig.password,
  database: AppDatabaseConfig.database,
  entities: [path.resolve(__dirname, 'entities.ts')],
  synchronize: AppEnvironment === 'development',
  logging: true
});

export const initializeAppDataSource = async (): Promise<void> => {
  await AppDataSource.initialize();
};
