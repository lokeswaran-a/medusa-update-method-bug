import { InferTypeOf } from '@medusajs/types'
import { model } from '@medusajs/utils'
import Role from './roles.model'

const Permission = model.define('permission', {
  id: model.id({ prefix: 'perm' }).primaryKey(),
  name: model.text().unique().index().searchable(),
  path: model.text(),
  method: model.enum(['GET', 'ALL']),
  roles: model.manyToMany(() => Role, {
    mappedBy: 'permissions',
  }),
})

export type Permission = InferTypeOf<typeof Permission>
export default Permission
