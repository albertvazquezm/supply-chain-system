import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
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
    return this.supplyChainService.updateSupplyChainItem(Number(id), supplyChainItem);
  }
}
