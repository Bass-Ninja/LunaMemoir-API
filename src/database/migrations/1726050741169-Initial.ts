import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726050741169 implements MigrationInterface {
    name = 'Initial1726050741169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "dream_symbol" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f324602f1b76e1f29b4833ff367" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."dream_mood_enum" AS ENUM('OTHER', 'HAPPY', 'SAD', 'CONFUSED', 'SCARED')
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
            CREATE TABLE "dream" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "date" TIMESTAMP NOT NULL DEFAULT now(),
                "mood" "public"."dream_mood_enum" NOT NULL DEFAULT 'OTHER',
                "category" "public"."dream_category_enum" NOT NULL DEFAULT 'OTHER',
                "user" uuid,
                CONSTRAINT "PK_d12349ee35ed0f8338f4883e81d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "dream_symbols" (
                "dreamId" uuid NOT NULL,
                "dreamSymbolId" uuid NOT NULL,
                CONSTRAINT "PK_a9bc10602f9a3348d8bb72221cd" PRIMARY KEY ("dreamId", "dreamSymbolId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_365c02c0764cf25ef0afea3df9" ON "dream_symbols" ("dreamId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_75400cd94e75493288fbc41bb1" ON "dream_symbols" ("dreamSymbolId")
        `);
        await queryRunner.query(`
            ALTER TABLE "dream"
            ADD CONSTRAINT "FK_7f585086bb75a5e17047ac007f0" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "dream_symbols"
            ADD CONSTRAINT "FK_365c02c0764cf25ef0afea3df94" FOREIGN KEY ("dreamId") REFERENCES "dream"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "dream_symbols"
            ADD CONSTRAINT "FK_75400cd94e75493288fbc41bb12" FOREIGN KEY ("dreamSymbolId") REFERENCES "dream_symbol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dream_symbols" DROP CONSTRAINT "FK_75400cd94e75493288fbc41bb12"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream_symbols" DROP CONSTRAINT "FK_365c02c0764cf25ef0afea3df94"
        `);
        await queryRunner.query(`
            ALTER TABLE "dream" DROP CONSTRAINT "FK_7f585086bb75a5e17047ac007f0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_75400cd94e75493288fbc41bb1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_365c02c0764cf25ef0afea3df9"
        `);
        await queryRunner.query(`
            DROP TABLE "dream_symbols"
        `);
        await queryRunner.query(`
            DROP TABLE "dream"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_category_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."dream_mood_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "dream_symbol"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
