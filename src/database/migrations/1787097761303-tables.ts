import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787097761303 implements MigrationInterface {
    name = 'Tables1787097761303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" DROP COLUMN "createdAt"`);
    }

}
