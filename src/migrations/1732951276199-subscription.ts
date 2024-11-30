import { MigrationInterface, QueryRunner } from 'typeorm';

export class Subscription1732951276199 implements MigrationInterface {
  name = 'Subscription1732951276199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."subscription_status_enum" AS ENUM('active', 'in_active')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" "public"."subscription_status_enum" NOT NULL DEFAULT 'active', "events" json NOT NULL, "callback_url" character varying NOT NULL, "user_id" uuid, "source_id" uuid, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_143d2fca75e4f8564af38a717a0" FOREIGN KEY ("source_id") REFERENCES "source"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_143d2fca75e4f8564af38a717a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`,
    );
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TYPE "public"."subscription_status_enum"`);
  }
}
