import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787096164713 implements MigrationInterface {
    name = 'Tables1787096164713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD "notes" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD "notes" character varying NOT NULL`);
    }

}
