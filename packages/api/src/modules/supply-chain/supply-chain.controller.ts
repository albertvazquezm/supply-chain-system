import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { JsonSchemaValidationPipe } from '@/common/pipes/json-schema.pipe';
import {
  SupplyChainCreateItem,
  supplyChainCreateItemSchema,
} from './dto/supply-chain-create-item.schema';
import {
  supplyChainCreateItemEventSchema,
  SupplyChainCreateItemEvent,
} from './dto/supply-chain-create-item-event.schema';

@Controller('supply-chain')
export class SupplyChainController {
  constructor(private supplyChainService: SupplyChainService) {}

  @Post('/item')
  @UsePipes(new JsonSchemaValidationPipe(supplyChainCreateItemSchema))
  createSupplyChainItem(
    @Body()
    supplyChainItem: SupplyChainCreateItem,
  ) {
    return this.supplyChainService.createSupplyChainItem(supplyChainItem);
  }

  @Get('/items')
  getSupplyChainItems() {
    return this.supplyChainService.getSupplyChainItems();
  }

  @Get('/item/:id')
  getSupplyChainItem(@Param('id') id: number) {
    return this.supplyChainService.getSupplyChainItem(Number(id));
  }

  @Put('/item/:id')
  //@UsePipes(new JsonSchemaValidationPipe(supplyChainCreateItemSchema))
  updateSupplyChainItem(
    @Body() supplyChainItem: SupplyChainCreateItem,
    @Param('id') id: number,
  ) {
    return this.supplyChainService.updateSupplyChainItem(
      Number(id),
      supplyChainItem,
    );
  }

  @Post('/item/:id/event')
  @UsePipes(new JsonSchemaValidationPipe(supplyChainCreateItemEventSchema))
  createSupplyChainItemEvent(
    @Body()
    supplyChainItemEvent: SupplyChainCreateItemEvent,
    @Param('id') id: number,
  ) {
    return this.supplyChainService.createSupplyChainItemEvent(
      Number(id),
      supplyChainItemEvent,
    );
  }
}
