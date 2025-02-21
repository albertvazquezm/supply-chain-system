import { JSONSchemaType } from 'ajv';
import {
  SupplyChainCreateItemEventAttribute,
  supplyChainCreateItemEventAttributeSchema,
} from './supply-chain-create-item-event-attribute.schema';

export interface SupplyChainCreateItemEvent {
  eventType: string;
  attributes: SupplyChainCreateItemEventAttribute[];
}

export const supplyChainCreateItemEventSchema: JSONSchemaType<SupplyChainCreateItemEvent> =
  {
    type: 'object',
    properties: {
      eventType: { type: 'string' },
      attributes: {
        type: 'array',
        items: supplyChainCreateItemEventAttributeSchema,
      },
    },
    required: ['eventType', 'attributes'],
  };
