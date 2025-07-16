import { AppDataSource } from '../data-source';
import { Pedido } from '../models/pedido.entities';

export class PedidoService {
  private repo = AppDataSource.getRepository(Pedido);

  async crear(data: Partial<Pedido>) {
    const pedido = this.repo.create(data);
    return await this.repo.save(pedido);
  }

  async listar() {
    return await this.repo.find();
  }

  async obtenerPorId(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async actualizar(id: number, data: Partial<Pedido>) {
    await this.repo.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: number) {
    return await this.repo.delete(id);
  }
}
