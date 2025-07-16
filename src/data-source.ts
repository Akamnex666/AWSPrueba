// src/data-source.ts
import { DataSource } from 'typeorm';
import { Pedido } from './models/pedido.entities';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: [Pedido],
  migrations: [],
  subscribers: [],
});
