import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SupplyChainItemEvent } from './supply-chain-item-event.entity';

@Entity()
export class SupplyChainItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => SupplyChainItemEvent, (event) => event.item)
  events: SupplyChainItemEvent[];
}
