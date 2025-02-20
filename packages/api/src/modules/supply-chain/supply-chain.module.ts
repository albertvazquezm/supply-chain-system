import { Module } from '@nestjs/common';
import { SupplyChainController } from './supply-chain.controller';
import { SupplyChainItem } from '@/db/entities/supply-chain-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainService } from './supply-chain.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainItem])],
  controllers: [SupplyChainController],
  providers: [SupplyChainService],
})
export class SupplyChainModule {}
