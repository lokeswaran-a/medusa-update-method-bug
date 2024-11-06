import { Migration } from '@mikro-orm/migrations'

export class Migration20241025072222 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table if exists "role" drop constraint if exists "role_agent_type_check";')

    this.addSql('alter table if exists "role" alter column "agent_type" type text using ("agent_type"::text);')
    this.addSql('alter table if exists "role" add constraint "role_agent_type_check" check ("agent_type" in (\'SALES_AGENT\', \'CUSTOMER_SUPPORT_AGENT\', \'NO_AGENT\'));')
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "role" drop constraint if exists "role_agent_type_check";')

    this.addSql('alter table if exists "role" alter column "agent_type" type text using ("agent_type"::text);')
    this.addSql('alter table if exists "role" add constraint "role_agent_type_check" check ("agent_type" in (\'SALES_AGENT\', \'CUSTOMER_SUPPORT_AGENT\'));')
  }
}
