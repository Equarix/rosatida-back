import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787233580470 implements MigrationInterface {
    name = 'Tables1787233580470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "speach" ("speachId" SERIAL NOT NULL, "name" character varying NOT NULL, "speach" text NOT NULL, "categoryCategoryEnterpriseId" integer, CONSTRAINT "PK_8b5269023e9b4c5c09291c1e295" PRIMARY KEY ("speachId"))`);
        await queryRunner.query(`ALTER TABLE "category_enterprise" DROP COLUMN "speach"`);
        await queryRunner.query(`ALTER TABLE "speach" ADD CONSTRAINT "FK_cb05a16dfafacb72e4798bc7c08" FOREIGN KEY ("categoryCategoryEnterpriseId") REFERENCES "category_enterprise"("categoryEnterpriseId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "speach" DROP CONSTRAINT "FK_cb05a16dfafacb72e4798bc7c08"`);
        await queryRunner.query(`ALTER TABLE "category_enterprise" ADD "speach" text`);
        await queryRunner.query(`DROP TABLE "speach"`);
    }

}
