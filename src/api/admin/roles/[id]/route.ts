import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { ROLE_MODULE } from '../../../../modules/roles'
import RoleModuleService from '../../../../modules/roles/service'


export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const logger = req.scope.resolve('logger')
  const id = req.params.id
  if (!id) {
    res.status(400).json({
      message: 'Role id is required',
    })
    return
  }
  logger.info(`Fetching role with id ${id}`)
  try {


    const { role, permissions } = req.body as any
    const roleModuleService = req.scope.resolve<RoleModuleService>(ROLE_MODULE)
    const existingRole = await roleModuleService.retrieveRole(id)

    if (role.name !== existingRole.name) {
      res.status(400).json({
        message: `Role name cannot be changed`,
      })
      return
    }

    const permissionIds = await roleModuleService.convertAndFetchPermissions(
      permissions,
    )

    // BUG: This updateRoles method is not removing the existing permissions from the role when the permissions array is empty
    const updatedRole = await roleModuleService.updateRoles({
      id,
      ...role,
      permissions: permissionIds,
    })
    logger.info('Role updated successfully')
    res.status(200).json(updatedRole)
  }
  catch (error) {
    logger.error(`Error updating role: ${error}`)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
