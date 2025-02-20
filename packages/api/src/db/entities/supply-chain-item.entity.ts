import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplyChainItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
