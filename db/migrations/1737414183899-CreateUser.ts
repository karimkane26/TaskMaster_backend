import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1737414183899 implements MigrationInterface {
    name = 'CreateUser1737414183899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "message" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "taskId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_entity_status_enum" AS ENUM('To Do', 'In Progress', 'Done')`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "status" "public"."task_entity_status_enum" NOT NULL DEFAULT 'To Do'`);
        await queryRunner.query(`CREATE TYPE "public"."task_entity_priority_enum" AS ENUM('Low', 'Medium', 'High')`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "priority" "public"."task_entity_priority_enum" NOT NULL DEFAULT 'Medium'`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "history" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "dueDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "dueDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "task_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "dueDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task_entity" ALTER COLUMN "dueDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "history"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."task_entity_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
