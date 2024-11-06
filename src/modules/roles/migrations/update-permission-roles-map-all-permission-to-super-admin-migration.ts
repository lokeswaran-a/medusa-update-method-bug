import { Migration } from '@mikro-orm/migrations'

export class Migration20241029063636 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      INSERT INTO "permission_roles" (role_id, permission_id)
      VALUES
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FZHVCPXKCXRP7P5Y2B'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X4D'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X6F'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X8H'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X0J'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FZHVCPXKCXRP7P5Y2L'),
      ('role_01JAZ539FZHVCPXKCXRP7P5Y1A', 'perm_01JAZ539FMZCCGMG0NA2YA4X4N')
      `)
  }

  async down(): Promise<void> {
    this.addSql(`
      DELETE FROM "permission_roles"
      WHERE "role_id" IN ('role_01JAZ539FZHVCPXKCXRP7P5Y1A' )
    `)
  }
}
