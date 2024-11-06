import { MedusaService } from '@medusajs/utils'
import {
  PERMISSION_METHOD_MAPPING,
  PERMISSION_PATH_MAPPING,
} from '../../constants/permission'
import { IPermission, Permission, Role } from './models'
import { IPostBody } from './types/roleInterface'

export default class RoleModuleService extends MedusaService({
  Role,
  Permission,
}) {
  computePermissions(permissions: IPermission[]) {
    const computedPerms: Record<string, string> = {}

    Object.keys(PERMISSION_PATH_MAPPING).forEach((module) => {
      const hasViewOnlyPermission = permissions.find(
        permission =>
          permission.path === PERMISSION_PATH_MAPPING[module]
          && permission.method === 'GET',
      )
      const hasManagePermission = permissions.find(
        permission =>
          permission.path === PERMISSION_PATH_MAPPING[module]
          && permission.method === 'ALL',
      )

      if (hasManagePermission) {
        computedPerms[module] = PERMISSION_METHOD_MAPPING.MANAGE
      }
      else if (hasViewOnlyPermission) {
        computedPerms[module] = PERMISSION_METHOD_MAPPING.VIEW
      }
      else {
        computedPerms[module] = PERMISSION_METHOD_MAPPING.NO_ACCESS
      }
    })

    return computedPerms
  }

  async convertAndFetchPermissions(
    permissions: IPostBody['permissions'],
  ): Promise<string[]> {
    const permissionIds: string[] = []

    for (const [module, access] of Object.entries(permissions)) {
      const path = PERMISSION_PATH_MAPPING[module]
      if (!path) {
        throw new Error('Invalid path')
      }

      let method: 'GET' | 'ALL'
      if (access === 'MANAGE') {
        method = 'ALL'
      }
      else if (access === 'VIEW') {
        method = 'GET'
      }
      else {
        continue
      }

      const permission = await this.listPermissions(
        { path, method },
        {
          select: ['id'],
        },
      )

      if (permission) {
        permissionIds.push(permission[0].id)
      }
    }

    return permissionIds
  }
}
