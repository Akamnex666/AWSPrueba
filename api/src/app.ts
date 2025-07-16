import express from 'express';
import pedidosRouter from './routes/pedidos.routes';

const app = express();

app.use(express.json());
app.use('/api/pedidos', pedidosRouter);

// Middleware para manejar errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

export default app;