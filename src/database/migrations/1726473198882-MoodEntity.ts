import { MigrationInterface, QueryRunner } from "typeorm";

export class MoodEntity1726473198882 implements MigrationInterface {
    name = 'MoodEntity1726473198882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "mood" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_cd069bf46deedf0ef3a7771f44b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "mood"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_mood_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "mood" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD CONSTRAINT "FK_98fbc610939c76fa2bce72f8456" FOREIGN KEY ("mood") REFERENCES "mood"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dream" DROP CONSTRAINT "FK_98fbc610939c76fa2bce72f8456"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "mood"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_mood_enum" AS ENUM('OTHER', 'HAPPY', 'SAD', 'CONFUSED', 'SCARED')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "mood" "public"."dream_mood_enum" NOT NULL DEFAULT 'OTHER'
        `);
        await queryRunner.query(`
            DROP TABLE "mood"
        `);
    }

}
