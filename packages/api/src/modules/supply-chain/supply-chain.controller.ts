import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';
import { JsonSchemaValidationPipe } from '@/common/pipes/json-schema.pipe';
import {
  SupplyChainCreateItem,
  supplyChainCreateItemSchema,
} from './dto/supply-chain-create-item.schema';

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
}
