import { JSONSchemaType } from 'ajv';

export interface SupplyChainUpsertItem {
  name: string;
  description: string;
  price?: number;
  color?: string;
}

export const supplyChainUpsertItemSchema: JSONSchemaType<SupplyChainUpsertItem> =
  {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0, maximum: 1000000, nullable: true },
      color: { type: 'string', nullable: true },
    },
    additionalProperties: false,
    required: ['name', 'description'],
  };
