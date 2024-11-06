import { Module } from '@medusajs/utils'
import RoleModuleService from './service'

export const ROLE_MODULE = 'roleModuleService'

export default Module(ROLE_MODULE, {
  service: RoleModuleService,
})
