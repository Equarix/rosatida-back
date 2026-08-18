import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787096702807 implements MigrationInterface {
    name = 'Tables1787096702807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_enterprise" ADD "speach" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_enterprise" DROP COLUMN "speach"`);
    }

}
