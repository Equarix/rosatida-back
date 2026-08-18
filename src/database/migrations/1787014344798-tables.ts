import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787014344798 implements MigrationInterface {
    name = 'Tables1787014344798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_enterprise" ADD "icon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_enterprise" DROP COLUMN "icon"`);
    }

}
