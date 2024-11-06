import { Migration } from '@mikro-orm/migrations'

export class UpdateUserPathPermissionMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      UPDATE "permission"
      SET "path" = '/admin/user'
      WHERE "path" = '/admin/userdetails'
    `)
  }

  async down(): Promise<void> {
    this.addSql(`
      UPDATE "permission"
      SET "path" = '/admin/userdetails'
      WHERE "path" = '/admin/user'
    `)
  }
}
