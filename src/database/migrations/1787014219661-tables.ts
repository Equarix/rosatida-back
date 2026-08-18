import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787014219661 implements MigrationInterface {
    name = 'Tables1787014219661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_enterprise" ("categoryEnterpriseId" SERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f167deeddcbdb9295896aa09538" PRIMARY KEY ("categoryEnterpriseId"))`);
        await queryRunner.query(`CREATE TYPE "public"."tracking_status_enum" AS ENUM('PENDING', 'ANSWERED', 'IN_PROGRESS')`);
        await queryRunner.query(`CREATE TABLE "tracking" ("trackingId" SERIAL NOT NULL, "answered" boolean NOT NULL, "date" TIMESTAMP NOT NULL, "channel" character varying NOT NULL, "status" "public"."tracking_status_enum" NOT NULL, "notes" character varying NOT NULL, "enterpriseEnterpriseId" integer, CONSTRAINT "PK_3d123d2c415a67fde1bc89bc750" PRIMARY KEY ("trackingId"))`);
        await queryRunner.query(`CREATE TABLE "enterprise" ("enterpriseId" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "street" character varying NOT NULL, "phone" character varying NOT NULL, "reviewCount" integer NOT NULL, "stars" integer NOT NULL, "urlGoogleMaps" character varying NOT NULL, "lat" character varying NOT NULL, "lng" character varying NOT NULL, "website" character varying NOT NULL, "schedules" jsonb NOT NULL, "categoryCategoryEnterpriseId" integer, CONSTRAINT "PK_b732de90c3327f9025514301265" PRIMARY KEY ("enterpriseId"))`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_d6725b8f2bf6c4e8f4adc9d14b1" FOREIGN KEY ("enterpriseEnterpriseId") REFERENCES "enterprise"("enterpriseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD CONSTRAINT "FK_70a396270354537ae0cde30c717" FOREIGN KEY ("categoryCategoryEnterpriseId") REFERENCES "category_enterprise"("categoryEnterpriseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_70a396270354537ae0cde30c717"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_d6725b8f2bf6c4e8f4adc9d14b1"`);
        await queryRunner.query(`DROP TABLE "enterprise"`);
        await queryRunner.query(`DROP TABLE "tracking"`);
        await queryRunner.query(`DROP TYPE "public"."tracking_status_enum"`);
        await queryRunner.query(`DROP TABLE "category_enterprise"`);
    }

}
