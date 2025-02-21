import { Module } from '@nestjs/common';
import { SupplyChainController } from './supply-chain.controller';
import { SupplyChainItem } from '@/db/entities/supply-chain-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainService } from './supply-chain.service';
import { SupplyChainItemEvent } from '@/db/entities/supply-chain-item-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainItem, SupplyChainItemEvent])],
  controllers: [SupplyChainController],
  providers: [SupplyChainService],
})
export class SupplyChainModule {}
