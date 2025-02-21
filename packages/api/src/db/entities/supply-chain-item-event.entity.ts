import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { SupplyChainItemEventAttribute } from './supply-chain-item-event-attribute.entity';

@Entity()
export class SupplyChainItemEvent {
  @PrimaryGeneratedColumn()
  id: number;

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
