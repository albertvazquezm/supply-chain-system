import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainItem } from '@/db/entities/supply-chain-item.entity';
import { Repository } from 'typeorm';
import { SupplyChainCreateItem } from './dto/supply-chain-create-item.schema';

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChainItem)
    private supplyChainItemRepository: Repository<SupplyChainItem>,
  ) {}

  async createSupplyChainItem(supplyChainCreateItem: SupplyChainCreateItem) {
    return this.supplyChainItemRepository.save({
      name: supplyChainCreateItem.name,
      description: supplyChainCreateItem.description,
    });
  }

  async getSupplyChainItems() {
    return this.supplyChainItemRepository.find();
  }

  async getSupplyChainItem(id: number) {
    return this.supplyChainItemRepository.findOne({ where: { id } });
  }

  async updateSupplyChainItem(
    id: number,
    supplyChainCreateItem: SupplyChainCreateItem,
  ) {
    return this.supplyChainItemRepository.save({
      id,
      name: supplyChainCreateItem.name,
      description: supplyChainCreateItem.description,
    });
  }
}
