import {
  PERMISSION_METHOD_MAPPING,
  PERMISSION_PATH_MAPPING,
} from '../../constants/permission'
import { IPermission } from './models'
import RoleModuleService from './service'

describe('RoleModuleService', () => {
  let roleModuleService: RoleModuleService
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  }
  beforeEach(() => {
    roleModuleService = new RoleModuleService({
      logger: mockLogger,
    })
  })

  describe('computePermissions', () => {
    it('should compute permissions correctly', () => {
      const testPermissions = [
        { path: PERMISSION_PATH_MAPPING.CUSTOMER, method: 'GET' },
        { path: PERMISSION_PATH_MAPPING.COMPANY, method: 'ALL' },
        { path: PERMISSION_PATH_MAPPING.ARFQ, method: 'GET' },
      ] as IPermission[]

      const result = roleModuleService.computePermissions(testPermissions)

      expect(result).toEqual({
        CUSTOMER: PERMISSION_METHOD_MAPPING.VIEW,
        COMPANY: PERMISSION_METHOD_MAPPING.MANAGE,
        PRODUCT_ACCESS_OVERRIDE: PERMISSION_METHOD_MAPPING.NO_ACCESS,
        ARFQ: PERMISSION_METHOD_MAPPING.VIEW,
        TERMS_AND_CONDITION: PERMISSION_METHOD_MAPPING.NO_ACCESS,
        USER: PERMISSION_METHOD_MAPPING.NO_ACCESS,
        USER_GROUP: PERMISSION_METHOD_MAPPING.NO_ACCESS,
      })
    })

    it('should handle empty permissions array', () => {
      const result = roleModuleService.computePermissions([])

      const expectedResult = Object.keys(PERMISSION_PATH_MAPPING).reduce(
        (acc, key) => {
          acc[key] = PERMISSION_METHOD_MAPPING.NO_ACCESS
          return acc
        },
        {},
      )

      expect(result).toEqual(expectedResult)
    })

    it('should prioritize MANAGE over VIEW permissions', () => {
      const testPermissions = [
        { path: PERMISSION_PATH_MAPPING.CUSTOMER, method: 'GET' },
        { path: PERMISSION_PATH_MAPPING.CUSTOMER, method: 'ALL' },
      ] as IPermission[]

      const result = roleModuleService.computePermissions(testPermissions)

      expect(result.CUSTOMER).toBe(PERMISSION_METHOD_MAPPING.MANAGE)
    })
  })

  describe('convertAndFetchPermissions', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(roleModuleService, 'listPermissions').mockResolvedValue([])
    })

    it('should convert and fetch permissions correctly', async () => {
      const mockPermissions = {
        CUSTOMER: 'MANAGE',
        COMPANY: 'VIEW',
        ARFQ: 'NO_ACCESS',
      }

      jest
        .spyOn(roleModuleService, 'listPermissions')
        .mockImplementation((query) => {
          if (
            query.path === PERMISSION_PATH_MAPPING.CUSTOMER
            && query.method === 'ALL'
          ) {
            return Promise.resolve([{ id: 'customer-manage-id' }])
          }
          if (
            query.path === PERMISSION_PATH_MAPPING.COMPANY
            && query.method === 'GET'
          ) {
            return Promise.resolve([{ id: 'company-view-id' }])
          }
          return Promise.resolve([])
        })

      const result = await roleModuleService.convertAndFetchPermissions(
        mockPermissions as any,
      )

      expect(result).toEqual(['customer-manage-id', 'company-view-id'])
      expect(roleModuleService.listPermissions).toHaveBeenCalledTimes(2)
    })

    it('should throw an error for invalid path', async () => {
      const mockPermissions = {
        INVALID_MODULE: 'MANAGE',
      }

      await expect(
        roleModuleService.convertAndFetchPermissions(mockPermissions as any),
      ).rejects.toThrow('Invalid path')
    })

    it('should skip NO_ACCESS permissions', async () => {
      const mockPermissions = {
        CUSTOMER: 'NO_ACCESS',
        COMPANY: 'VIEW',
      }

      jest
        .spyOn(roleModuleService, 'listPermissions')
        .mockResolvedValue([{ id: 'company-view-id' } as IPermission])

      const result = await roleModuleService.convertAndFetchPermissions(
        mockPermissions as any,
      )

      expect(result).toEqual(['company-view-id'])
      expect(roleModuleService.listPermissions).toHaveBeenCalledTimes(1)
    })

    it('should handle empty permissions object', async () => {
      const result = await roleModuleService.convertAndFetchPermissions(
        {} as any,
      )

      expect(result).toEqual([])
      expect(roleModuleService.listPermissions).not.toHaveBeenCalled()
    })
  })
})
