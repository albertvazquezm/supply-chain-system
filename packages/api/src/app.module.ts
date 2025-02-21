import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupplyChainModule } from './modules/supply-chain/supply-chain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainItem } from './db/entities/supply-chain-item.entity';
import { SupplyChainItemEventAttribute } from './db/entities/supply-chain-item-event-attribute.entity';
import { SupplyChainItemEvent } from './db/entities/supply-chain-item-event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        SupplyChainItem,
        SupplyChainItemEvent,
        SupplyChainItemEventAttribute,
      ],
      synchronize: true,
    }),
    SupplyChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
