import { Migration } from '@mikro-orm/migrations'

export class Migration20241024085632 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table if not exists "permission" ("id" text not null, "name" text not null, "path" text not null, "method" text check ("method" in (\'GET\', \'ALL\')) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "permission_pkey" primary key ("id"));')
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_permission_name_unique" ON "permission" (name) WHERE deleted_at IS NULL;')
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_permission_name" ON "permission" (name) WHERE deleted_at IS NULL;')

    this.addSql('create table if not exists "role" ("id" text not null, "name" text not null, "description" text not null, "is_active" boolean not null default true, "agent_type" text check ("agent_type" in (\'SALES_AGENT\', \'CUSTOMER_SUPPORT_AGENT\')) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "role_pkey" primary key ("id"));')
    this.addSql('CREATE UNIQUE INDEX IF NOT EXISTS "IDX_role_name_unique" ON "role" (name) WHERE deleted_at IS NULL;')
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_role_name" ON "role" (name) WHERE deleted_at IS NULL;')

    this.addSql('create table if not exists "permission_roles" ("role_id" text not null, "permission_id" text not null, constraint "permission_roles_pkey" primary key ("role_id", "permission_id"));')

    this.addSql('alter table if exists "permission_roles" add constraint "permission_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;')
    this.addSql('alter table if exists "permission_roles" add constraint "permission_roles_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;')
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "permission_roles" drop constraint if exists "permission_roles_permission_id_foreign";')

    this.addSql('alter table if exists "permission_roles" drop constraint if exists "permission_roles_role_id_foreign";')

    this.addSql('drop table if exists "permission" cascade;')

    this.addSql('drop table if exists "role" cascade;')

    this.addSql('drop table if exists "permission_roles" cascade;')
  }
}
