import { JSONSchemaType } from 'ajv';

export interface SupplyChainCreateItem {
  name: string;
  description: string;
  price: number;
  color: string;
}

export const supplyChainCreateItemSchema: JSONSchemaType<SupplyChainCreateItem> =
  {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0, maximum: 1000000 },
      color: { type: 'string' },
    },
    required: ['name', 'description'],
  };
