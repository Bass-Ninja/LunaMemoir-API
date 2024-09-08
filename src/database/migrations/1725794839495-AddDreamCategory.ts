import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDreamCategory1725794839495 implements MigrationInterface {
    name = 'AddDreamCategory1725794839495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."dream_category_enum" AS ENUM('-1', '0', '1', '2', '3', '4', '5', '6', '7')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "category" "public"."dream_category_enum" NOT NULL DEFAULT '-1'
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "mood"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_mood_enum" AS ENUM('-1', '0', '1', '2')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "mood" "public"."dream_mood_enum" NOT NULL DEFAULT '-1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "mood"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_mood_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "mood" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "category"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_category_enum"
        `);
    }

}
