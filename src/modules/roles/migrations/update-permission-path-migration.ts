import { Migration } from '@mikro-orm/migrations'

export class UpdatePermissionPathMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      UPDATE "permission"
      SET "path" = CONCAT('/admin', "path")
      WHERE "path" IN ('/customers', '/custom/product-access-overrides', '/quote', '/terms-and-conditions', '/company-details', '/userdetails', '/roles')
    `)
  }

  async down(): Promise<void> {
    this.addSql(`
      UPDATE "permission"
      SET "path" = SUBSTRING("path", 7)
      WHERE "path" LIKE '/admin/%'
    `)
  }
}
