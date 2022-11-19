import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1668682683486 implements MigrationInterface {
    name = '$npmConfigName1668682683486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
