import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1787094428010 implements MigrationInterface {
    name = 'Tables1787094428010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" DROP COLUMN "stars"`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD "stars" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise" DROP COLUMN "stars"`);
        await queryRunner.query(`ALTER TABLE "enterprise" ADD "stars" integer NOT NULL`);
    }

}
