import { JSONSchemaType } from 'ajv';

export interface SupplyChainCreateItemEventAttribute {
  key: string;
  value: string;
}

export const supplyChainCreateItemEventAttributeSchema: JSONSchemaType<SupplyChainCreateItemEventAttribute> =
  {
    type: 'object',
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
    },
    required: ['key', 'value'],
  };
