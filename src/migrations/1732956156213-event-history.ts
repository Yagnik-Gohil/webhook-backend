import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventHistory1732956156213 implements MigrationInterface {
  name = 'EventHistory1732956156213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "event" character varying NOT NULL, "description" text NOT NULL, "payload" jsonb NOT NULL, "user_id" uuid, "subscription_id" uuid, CONSTRAINT "PK_cdac290cc64352558c203d86f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_history" ADD CONSTRAINT "FK_fb7ee30623db95a52a3817ea4ce" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_history" ADD CONSTRAINT "FK_d73f18135068fbbae164ebe4505" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_history" DROP CONSTRAINT "FK_d73f18135068fbbae164ebe4505"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_history" DROP CONSTRAINT "FK_fb7ee30623db95a52a3817ea4ce"`,
    );
    await queryRunner.query(`DROP TABLE "event_history"`);
  }
}
