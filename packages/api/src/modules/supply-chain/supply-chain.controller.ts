import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupplyChainService } from './supply-chain.service';
import { JsonSchemaValidationPipe } from '@/common/pipes/json-schema.pipe';
import {
  SupplyChainUpsertItem,
  supplyChainUpsertItemSchema,
} from './dto/supply-chain-upsert-item.schema';
import {
  supplyChainCreateItemEventSchema,
  SupplyChainCreateItemEvent,
} from './dto/supply-chain-create-item-event.schema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@ApiTags('Supply Chain')
@Controller('supply-chain')
export class SupplyChainController {
  constructor(private supplyChainService: SupplyChainService) {}

  @Post('/item')
  @ApiOperation({ summary: 'Create a new supply chain item' })
  @ApiBody({ schema: supplyChainUpsertItemSchema as SchemaObject })
  @UsePipes(new JsonSchemaValidationPipe(supplyChainUpsertItemSchema))
  createSupplyChainItem(
    @Body()
    supplyChainItem: SupplyChainUpsertItem,
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
  @ApiBody({ schema: supplyChainUpsertItemSchema as SchemaObject })
  @UsePipes(new JsonSchemaValidationPipe(supplyChainUpsertItemSchema))
  updateSupplyChainItem(
    @Body() supplyChainItem: SupplyChainUpsertItem,
    @Param('id') id: number,
  ) {
    return this.supplyChainService.updateSupplyChainItem(
      Number(id),
      supplyChainItem,
    );
  }

  @Post('/item/:id/event')
  @ApiOperation({ summary: 'Create a new event for a supply chain item' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ schema: supplyChainCreateItemEventSchema as SchemaObject })
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

  @Get('/item/:id/events')
  getSupplyChainItemEvents(@Param('id') id: number) {
    return this.supplyChainService.getSupplyChainItemEvents(Number(id));
  }

  @Get('/item/:id/current-location')
  getSupplyChainItemCurrentLocation(@Param('id') id: number) {
    return this.supplyChainService.getSupplyChainItemCurrentLocation(
      Number(id),
    );
  }
}
