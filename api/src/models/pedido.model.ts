import { connect } from './db';

export interface Pedido {
  id?: number;
  fecha: Date;
  cantidad: number;
  tipo: 'maduro' | 'verde';
  forma: 'largo' | 'redondo';
  tamaño: 'grande' | 'mediano' | 'pequeño';
  observaciones?: string;
  creado_en?: Date;
  actualizado_en?: Date;
}

export async function crearPedido(pedido: Omit<Pedido, 'id'|'creado_en'|'actualizado_en'>): Promise<number> {
  const conn = await connect();
  const [result] = await conn.execute(
    'INSERT INTO pedidos (fecha, cantidad, tipo, forma, tamaño, observaciones) VALUES (?, ?, ?, ?, ?, ?)',
    [pedido.fecha, pedido.cantidad, pedido.tipo, pedido.forma, pedido.tamaño, pedido.observaciones || null]
  );
  return (result as any).insertId;
}

export async function obtenerPedidos(): Promise<Pedido[]> {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM pedidos ORDER BY fecha DESC, creado_en DESC');
  return rows as Pedido[];
}

export async function obtenerPedidoPorId(id: number): Promise<Pedido | null> {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM pedidos WHERE id = ?', [id]);
  const pedidos = rows as Pedido[];
  return pedidos.length ? pedidos[0] : null;
}

export async function actualizarPedido(id: number, pedido: Partial<Pedido>): Promise<boolean> {
  const conn = await connect();
  const [result] = await conn.execute(
    'UPDATE pedidos SET fecha = ?, cantidad = ?, tipo = ?, forma = ?, tamaño = ?, observaciones = ? WHERE id = ?',
    [pedido.fecha, pedido.cantidad, pedido.tipo, pedido.forma, pedido.tamaño, pedido.observaciones || null, id]
  );
  return (result as any).affectedRows > 0;
}

export async function eliminarPedido(id: number): Promise<boolean> {
  const conn = await connect();
  const [result] = await conn.execute('DELETE FROM pedidos WHERE id = ?', [id]);
  return (result as any).affectedRows > 0;
}