import { Migration } from '@mikro-orm/migrations'

export class PermissionsMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      INSERT INTO "permission" ("id", "name", "path", "method", "created_at", "updated_at")
      VALUES
        ('perm_01JAZ539FMZCCGMG0NA2YA4X1A', 'VIEW COMPANY DETAILS', '/company-details', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FZHVCPXKCXRP7P5Y2B', 'MANAGE COMPANY DETAILS', '/company-details', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X3C', 'VIEW CUSTOMERS', '/customers', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X4D', 'MANAGE CUSTOMERS', '/customers', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X5E', 'VIEW PRODUCT ACCESS OVERRIDES', '/custom/product-access-overrides', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X6F', 'MANAGE PRODUCT ACCESS OVERRIDES', '/custom/product-access-overrides', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X7G', 'VIEW QUOTES', '/quote', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X8H', 'MANAGE QUOTES', '/quote', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X9I', 'VIEW TERMS AND CONDITIONS', '/terms-and-conditions', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X0J', 'MANAGE TERMS AND CONDITIONS', '/terms-and-conditions', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X1K', 'VIEW USER DETAILS', '/userdetails', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FZHVCPXKCXRP7P5Y2L', 'MANAGE USER DETAILS', '/userdetails', 'ALL', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X3M', 'VIEW ROLES', '/roles', 'GET', NOW(), NOW()),
        ('perm_01JAZ539FMZCCGMG0NA2YA4X4N', 'MANAGE ROLES', '/roles', 'ALL', NOW(), NOW())
    `)
  }

  async down(): Promise<void> {
    this.addSql(`
      DELETE FROM "permission"
      WHERE "id" IN (
        'perm_01JAZ539FMZCCGMG0NA2YA4X1A', 'perm_01JAZ539FZHVCPXKCXRP7P5Y2B',
        'perm_01JAZ539FMZCCGMG0NA2YA4X3C', 'perm_01JAZ539FMZCCGMG0NA2YA4X4D',
        'perm_01JAZ539FMZCCGMG0NA2YA4X5E', 'perm_01JAZ539FMZCCGMG0NA2YA4X6F',
        'perm_01JAZ539FMZCCGMG0NA2YA4X7G', 'perm_01JAZ539FMZCCGMG0NA2YA4X8H',
        'perm_01JAZ539FMZCCGMG0NA2YA4X9I', 'perm_01JAZ539FMZCCGMG0NA2YA4X0J',
        'perm_01JAZ539FMZCCGMG0NA2YA4X1K', 'perm_01JAZ539FZHVCPXKCXRP7P5Y2L',
        'perm_01JAZ539FMZCCGMG0NA2YA4X3M', 'perm_01JAZ539FMZCCGMG0NA2YA4X4N'
      );
    `)
  }
}
