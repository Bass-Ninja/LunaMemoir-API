import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnumTypes1725803144833 implements MigrationInterface {
    name = 'ChangeEnumTypes1725803144833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."dream_mood_enum"
            RENAME TO "dream_mood_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_mood_enum" AS ENUM('OTHER', 'HAPPY', 'SAD', 'CONFUSED', 'SCARED')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood" TYPE "public"."dream_mood_enum" USING "mood"::"text"::"public"."dream_mood_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood"
            SET DEFAULT 'OTHER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_mood_enum_old"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."dream_category_enum"
            RENAME TO "dream_category_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_category_enum" AS ENUM(
                'OTHER',
                'LUCID',
                'NIGHTMARE',
                'DAYDREAM',
                'RECURRING',
                'FANTASY',
                'PROPHETIC',
                'VIVID',
                'HEALING'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category" TYPE "public"."dream_category_enum" USING "category"::"text"::"public"."dream_category_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category"
            SET DEFAULT 'OTHER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_category_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."dream_category_enum_old" AS ENUM('-1', '0', '1', '2', '3', '4', '5', '6', '7')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category" TYPE "public"."dream_category_enum_old" USING "category"::"text"::"public"."dream_category_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "category"
            SET DEFAULT '-1'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_category_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."dream_category_enum_old"
            RENAME TO "dream_category_enum"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_mood_enum_old" AS ENUM('-1', '0', '1', '2')
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood" TYPE "public"."dream_mood_enum_old" USING "mood"::"text"::"public"."dream_mood_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ALTER COLUMN "mood"
            SET DEFAULT '-1'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_mood_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."dream_mood_enum_old"
            RENAME TO "dream_mood_enum"
        `);
    }

}
