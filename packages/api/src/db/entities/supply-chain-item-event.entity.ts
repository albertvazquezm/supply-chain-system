import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { SupplyChainItemEventAttribute } from './supply-chain-item-event-attribute.entity';
import { SupplyChainItem } from './supply-chain-item.entity';

@Entity()
export class SupplyChainItemEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SupplyChainItem, (item) => item.events)
  item: SupplyChainItem;

  @Column()
  eventType: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(
    () => SupplyChainItemEventAttribute,
    (attribute) => attribute.event,
    { cascade: true },
  )
  attributes: SupplyChainItemEventAttribute[];
}
