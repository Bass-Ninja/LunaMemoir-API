import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1724846978155 implements MigrationInterface {
  name = 'AddUserTable1724846978155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "dream" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "tags" text NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "mood" character varying NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_d12349ee35ed0f8338f4883e81d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "dream"
            ADD CONSTRAINT "FK_30da0ecff9d07bebd4669962b21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "dream" DROP CONSTRAINT "FK_30da0ecff9d07bebd4669962b21"
        `);
    await queryRunner.query(`
            DROP TABLE "dream"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
