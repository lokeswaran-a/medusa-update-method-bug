export interface IPostBody {
  role: {
    name: string
    description: string
    is_active: boolean
    agent_type: 'SALES_AGENT' | 'CUSTOMER_SUPPORT_AGENT' | 'NO_AGENT'
  }
  permissions: {
    CUSTOMER: PermissionLevel
    COMPANY: PermissionLevel
    PRODUCT_ACCESS_OVERRIDE: PermissionLevel
    ARFQ: PermissionLevel
    TERMS_AND_CONDITION: PermissionLevel
    USER: PermissionLevel
    USER_GROUP: PermissionLevel
  }
}
export interface IPutBody {
  role: {
    name: string
    description: string
    is_active: boolean
  }
  permissions: {
    CUSTOMER: PermissionLevel
    COMPANY: PermissionLevel
    PRODUCT_ACCESS_OVERRIDE: PermissionLevel
    ARFQ: PermissionLevel
    TERMS_AND_CONDITION: PermissionLevel
    USER: PermissionLevel
    USER_GROUP: PermissionLevel
  }
}

type PermissionLevel = 'VIEW' | 'MANAGE' | 'NO_ACCESS'

export interface IUpdatePostBody {
  id: string
  name: string
  permissions: string[]
  userId?: string
}
