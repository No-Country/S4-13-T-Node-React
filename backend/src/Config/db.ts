import { DataSource } from 'typeorm';
import { ENV } from './config';
import Entities from '../Entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  port: ENV.DB_PORT,
  database: ENV.DB_DATABASE,
  entities: Entities,
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
