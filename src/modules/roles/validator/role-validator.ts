import { PERMISSION_PATH_MAPPING } from '../../../constants/permission'

export const createRoleSchema = {
  type: 'object',
  properties: {
    role: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        description: { type: 'string', minLength: 1, maxLength: 200 },
        is_active: { type: 'boolean' },
        agent_type: {
          type: 'string',
          enum: ['SALES_AGENT', 'CUSTOMER_SUPPORT_AGENT', 'NO_AGENT'],
        },
      },
      required: ['name', 'description', 'is_active', 'agent_type'],
      additionalProperties: false,
    },
    permissions: {
      type: 'object',
      propertyNames: {
        enum: Object.keys(PERMISSION_PATH_MAPPING),
      },
      patternProperties: {
        '^.*$': {
          type: 'string',
          enum: ['VIEW', 'MANAGE', 'NO_ACCESS'],
        },
      },
      additionalProperties: false,
      required: Object.keys(PERMISSION_PATH_MAPPING),
    },
  },
  required: ['role', 'permissions'],
  additionalProperties: false,
}
export const updateRoleSchema = {
  type: 'object',
  properties: {
    role: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        description: { type: 'string', minLength: 1, maxLength: 200 },
        is_active: { type: 'boolean' },
      },
      required: ['name', 'description', 'is_active'],
      additionalProperties: false,
    },
    permissions: {
      type: 'object',
      propertyNames: {
        enum: Object.keys(PERMISSION_PATH_MAPPING),
      },
      patternProperties: {
        '^.*$': {
          type: 'string',
          enum: ['VIEW', 'MANAGE', 'NO_ACCESS'],
        },
      },
      additionalProperties: false,
      required: Object.keys(PERMISSION_PATH_MAPPING),
    },
  },
  required: ['role', 'permissions'],
  additionalProperties: false,
}
