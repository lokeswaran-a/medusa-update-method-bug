import { InferTypeOf } from '@medusajs/types'
import { model } from '@medusajs/utils'
import Permission from './permission.model'

const Role = model.define('role', {
  id: model.id({ prefix: 'role' }).primaryKey(),
  name: model.text().unique().index().searchable(),
  description: model.text(),
  is_active: model.boolean().default(true),
  agent_type: model.enum(['SALES_AGENT', 'CUSTOMER_SUPPORT_AGENT', 'NO_AGENT']),
  permissions: model.manyToMany(() => Permission, {
    mappedBy: 'roles',
  }),
})

export type Role = InferTypeOf<typeof Role>
export default Role
