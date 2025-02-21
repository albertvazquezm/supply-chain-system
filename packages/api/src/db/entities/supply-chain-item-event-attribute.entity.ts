import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SupplyChainItemEvent } from './supply-chain-item-event.entity';

@Entity()
export class SupplyChainItemEventAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SupplyChainItemEvent, (event) => event.attributes)
  event: SupplyChainItemEvent;

  @Column()
  key: string;

  @Column()
  value: string;
}
