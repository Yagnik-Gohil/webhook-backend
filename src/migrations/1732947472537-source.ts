import { MigrationInterface, QueryRunner } from 'typeorm';

export class Source1732947472537 implements MigrationInterface {
  name = 'Source1732947472537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."source_status_enum" AS ENUM('active', 'in_active')`,
    );
    await queryRunner.query(
      `CREATE TABLE "source" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" "public"."source_status_enum" NOT NULL DEFAULT 'active', "name" character varying NOT NULL, "description" text, "events" json NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "PK_018c433f8264b58c86363eaadde" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `INSERT INTO "source" ("name", "description", "events", "thumbnail", "status") 
            VALUES 
            ('Stripe', 
            'Stripe is a payment processing platform that enables businesses to accept online payments.', 
            '["PAYMENT_SUCCEEDED", "PAYMENT_FAILED", "REFUND_CREATED", "SUBSCRIPTION_CANCELED"]', 
            'https://d21r3yo3pas5u.cloudfront.net/webhook/stripe.png', 
            'active'),
            
            ('Discord', 
            'Discord is a communication platform for gamers, with text, voice, and video chat.', 
            '["MESSAGE_CREATED", "USER_JOINED", "USER_LEFT", "MESSAGE_DELETED"]', 
            'https://d21r3yo3pas5u.cloudfront.net/webhook/discord.png', 
            'active'),
      
            ('GitHub', 
            'GitHub is a platform for version control and collaboration, allowing developers to work together on projects.', 
            '["PUSH", "ISSUE_OPENED", "PULL_REQUEST_MERGED", "REPOSITORY_CREATED"]', 
            'https://d21r3yo3pas5u.cloudfront.net/webhook/github.png', 
            'active'),
      
            ('PayPal', 
            'PayPal is an online payment system that supports online money transfers.', 
            '["PAYMENT_RECEIVED", "PAYMENT_REFUNDED", "INVOICE_PAID"]', 
            'https://d21r3yo3pas5u.cloudfront.net/webhook/paypal.png', 
            'active'),
      
            ('Twilio', 
            'Twilio is a cloud communications platform that provides APIs for sending messages, making calls, and more.', 
            '["SMS_SENT", "CALL_RECEIVED", "CALL_COMPLETED", "MESSAGE_DELIVERED"]', 
            'https://d21r3yo3pas5u.cloudfront.net/webhook/twilio.png', 
            'active')
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "source"`);
    await queryRunner.query(`DROP TABLE "source"`);
    await queryRunner.query(`DROP TYPE "public"."source_status_enum"`);
  }
}
