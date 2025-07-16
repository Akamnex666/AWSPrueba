import { Request, Response } from 'express';
import * as PedidoModel from '../models/pedido.model';

export async function crearPedido(req: Request, res: Response) {
  try {
    const { fecha, cantidad, tipo, forma, tamaño, observaciones } = req.body;
    
    if (!fecha || !cantidad || !tipo || !forma || !tamaño) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoPedido = {
      fecha: new Date(fecha),
      cantidad,
      tipo,
      forma,
      tamaño,
      observaciones
    };

    const id = await PedidoModel.crearPedido(nuevoPedido);
    res.status(201).json({ id, message: 'Pedido creado exitosamente' });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
}

export async function obtenerPedidos(req: Request, res: Response) {
  try {
    const pedidos = await PedidoModel.obtenerPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
}

export async function obtenerPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const pedido = await PedidoModel.obtenerPedidoPorId(id);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
}

export async function actualizarPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const actualizacion = req.body;
    const exito = await PedidoModel.actualizarPedido(id, actualizacion);
    
    if (exito) {
      res.json({ message: 'Pedido actualizado exitosamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
}

export async function eliminarPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const exito = await PedidoModel.eliminarPedido(id);
    if (exito) {
      res.json({ message: 'Pedido eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
}