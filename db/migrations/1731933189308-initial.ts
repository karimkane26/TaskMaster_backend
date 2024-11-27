/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1731933189308 implements MigrationInterface {
    name = 'Initial1731933189308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "dueDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_2621bebd84d2624da37a34797fc" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_2621bebd84d2624da37a34797fc"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
    }

}
