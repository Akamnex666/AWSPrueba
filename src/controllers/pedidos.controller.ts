import { Router, Request, Response } from 'express';
import { PedidoService } from '../services/pedido.service';

const router = Router();
const pedidoService = new PedidoService();

router.get('/', async (_req: Request, res: Response) => {
  const pedidos = await pedidoService.listar();
  res.json(pedidos);
});

router.get('/:id', async (req: Request, res: Response) => {
  const pedido = await pedidoService.obtenerPorId(Number(req.params.id));
  if (pedido) res.json(pedido);
  else res.status(404).json({ error: 'Pedido no encontrado' });
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevo = await pedidoService.crear(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el pedido', detalle: error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const actualizado = await pedidoService.actualizar(Number(req.params.id), req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el pedido' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  await pedidoService.eliminar(Number(req.params.id));
  res.status(204).send();
});

export default router;
