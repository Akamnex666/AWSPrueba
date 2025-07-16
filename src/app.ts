// src/index.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { AppDataSource } from './data-source';
import pedidoRouter from './controllers/pedidos.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/pedidos', pedidoRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });
