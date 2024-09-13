import { MigrationInterface, QueryRunner } from "typeorm";

export class DreamCategoryEntity1726210178857 implements MigrationInterface {
    name = 'DreamCategoryEntity1726210178857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dream"
                RENAME COLUMN "category" TO "dream-category"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."dream_category_enum"
            RENAME TO "dream_dream-category_enum"
        `);
        await queryRunner.query(`
            CREATE TABLE "dream_category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_d0ba8f4d33b607e2e29b822d7af" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "dream-category"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "dream-category" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD CONSTRAINT "FK_7db0dfebae9a29a57fd5a464ad2" FOREIGN KEY ("dream-category") REFERENCES "dream_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dream" DROP CONSTRAINT "FK_7db0dfebae9a29a57fd5a464ad2"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP COLUMN "dream-category"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD "dream-category" "public"."dream_dream-category_enum" NOT NULL DEFAULT 'OTHER'
        `);
        await queryRunner.query(`
            DROP TABLE "dream_category"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."dream_dream-category_enum"
            RENAME TO "dream_category_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
                RENAME COLUMN "dream-category" TO "category"
        `);
    }

}
