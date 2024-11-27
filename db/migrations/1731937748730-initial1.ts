/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial11731937748730 implements MigrationInterface {
    name = 'Initial11731937748730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "dueDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "dueDate" TIMESTAMP NOT NULL`);
    }

}
