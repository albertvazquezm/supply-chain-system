import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainItem } from '@/db/entities/supply-chain-item.entity';
import { Repository } from 'typeorm';
import { SupplyChainUpsertItem } from './dto/supply-chain-upsert-item.schema';
import { SupplyChainItemEvent } from '@/db/entities/supply-chain-item-event.entity';
import { SupplyChainCreateItemEvent } from './dto/supply-chain-create-item-event.schema';

@Injectable()
export class SupplyChainService {
  constructor(
    @InjectRepository(SupplyChainItem)
    private supplyChainItemRepository: Repository<SupplyChainItem>,
    @InjectRepository(SupplyChainItemEvent)
    private supplyChainItemEventRepository: Repository<SupplyChainItemEvent>,
  ) {}

  async createSupplyChainItem(supplyChainUpsertItem: SupplyChainUpsertItem) {
    return this.supplyChainItemRepository.save({
      name: supplyChainUpsertItem.name,
      description: supplyChainUpsertItem.description,
      price: supplyChainUpsertItem.price,
      color: supplyChainUpsertItem.color,
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
    supplyChainUpsertItem: SupplyChainUpsertItem,
  ) {
    return this.supplyChainItemRepository.save({
      id,
      name: supplyChainUpsertItem.name,
      description: supplyChainUpsertItem.description,
      price: supplyChainUpsertItem.price,
      color: supplyChainUpsertItem.color,
    });
  }

  async createSupplyChainItemEvent(
    itemId: number,
    supplyChainCreateItemEvent: SupplyChainCreateItemEvent,
  ) {
    return this.supplyChainItemEventRepository.save({
      item: { id: itemId },
      eventType: supplyChainCreateItemEvent.eventType,
      attributes: supplyChainCreateItemEvent.attributes,
    });
  }

  async getSupplyChainItemEvents(itemId: number) {
    return this.supplyChainItemEventRepository.find({
      where: { item: { id: itemId } },
      relations: ['attributes'],
      order: { createdAt: 'DESC' },
    });
  }

  async getSupplyChainItemCurrentLocation(itemId: number) {
    const lastLocationEvent = await this.supplyChainItemEventRepository.findOne(
      {
        where: { item: { id: itemId }, eventType: 'location' },
        relations: ['attributes'],
        order: { createdAt: 'DESC' },
      },
    );

    if (!lastLocationEvent) {
      return null;
    }

    return {
      location: lastLocationEvent.attributes.find(
        (attribute) => attribute.key === 'location',
      )?.value,
      date: lastLocationEvent.createdAt,
    };
  }
}
