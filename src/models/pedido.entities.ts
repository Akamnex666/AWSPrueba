import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fecha!: Date;

  @Column()
  cantidad!: number;

  @Column()
  tipo!: string; 

  @Column()
  forma!: string; 

  @Column()
  tamaño!: string; 

  @Column()
  observaciones?: string;
}
