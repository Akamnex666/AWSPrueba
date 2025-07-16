import { Router } from 'express';
import * as PedidosController from '../controllers/pedidos.controller';

const router = Router();

router.post('/', PedidosController.crearPedido);
router.get('/', PedidosController.obtenerPedidos);
router.get('/:id', PedidosController.obtenerPedido);
router.put('/:id', PedidosController.actualizarPedido);
router.delete('/:id', PedidosController.eliminarPedido);

export default router;