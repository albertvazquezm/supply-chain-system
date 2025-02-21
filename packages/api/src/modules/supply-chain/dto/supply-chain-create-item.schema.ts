import { JSONSchemaType } from 'ajv';

export interface SupplyChainCreateItem {
  name: string;
  description: string;
}

export const supplyChainCreateItemSchema: JSONSchemaType<SupplyChainCreateItem> =
  {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['name', 'description'],
  };
