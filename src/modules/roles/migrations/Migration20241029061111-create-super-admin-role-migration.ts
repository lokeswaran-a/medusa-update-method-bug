import { Migration } from '@mikro-orm/migrations'

export class CreateSuperAdminRoleMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      INSERT INTO "permission" ("id", "name", "path", "method", "created_at", "updated_at")
      VALUES
        ('perm_01JAZ539FMZCCGMG0NA2YA4X5O', 'MANAGE ADMIN', '/admin', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FZHVCPXKCXRP7P5Y7P', 'MANAGE AUTH', '/auth', 'ALL', NOW(), NOW())
    `)
    this.addSql(`
      INSERT INTO "role" (id, name, description, is_active, agent_type, created_at, updated_at)
      VALUES
        ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'Super Admin', 'This is a super admin user group with access to all the modules and permissions.', true, 'NO_AGENT', NOW(), NOW())
      `)
    this.addSql(`
      INSERT INTO "permission_roles"(role_id, permission_id)
      VALUES
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X5O'),('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FZHVCPXKCXRP7P5Y7P')
      `)
  }

  async down(): Promise<void> {
    this.addSql(`
      DELETE FROM "permission"
      WHERE "id" IN (
        'perm_01JAZ539FMZCCGMG0NA2YA4X5O', 'perm_01JAZ539FZHVCPXKCXRP7P5Y7P',
      )
    `)
    this.addSql(`
      DELETE FROM "role"
      WHERE "id" IN (
        'role_01JAZ539FZHVCPXKCXRP7P5Y1A'
      )
    `)
    this.addSql(`
      DELETE FROM "permission_roles"
      WHERE "role_id" ='role_01JAZ539FZHVCPXKCXRP7P5Y1A' AND "permission_id" = 'perm_01JAZ539FZHVCPXKCXRP7P5Y7P'
    `)
    this.addSql(`
      DELETE FROM "permission_roles"
      WHERE "role_id" = 'role_01JAZ539FZHVCPXKCXRP7P5Y1A' AND "permission_id" = 'perm_01JAZ539FMZCCGMG0NA2YA4X5O'
    `)
  }
}
