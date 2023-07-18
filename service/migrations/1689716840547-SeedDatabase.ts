import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1689716840547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" VALUES(1, 'admin@bookstore.com', '$2a$10$a2V8Wi38hBfab4Mc5HcNiOQj/njOHHyOy5JLzsyEMcL5qdQ7/RwIG')`,
    );
    await queryRunner.query(`INSERT INTO "role" VALUES(1, 'ADMIN')`);
    await queryRunner.query(`INSERT INTO "role" VALUES(2, 'USER')`);
    await queryRunner.query(`INSERT INTO "user_roles_role" VALUES(1, 1)`);
    await queryRunner.query(`INSERT INTO "user_roles_role" VALUES(1, 2)`);
    await queryRunner.query(
      `INSERT INTO "book" VALUES(1, '1984', 'George Orwell', '9780451524935', 7.48, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(2, 'Animal Farm', 'George Orwell', '9788129116123', 6.99, 15)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(3, 'To Kill a Mockingbird', 'Harper Lee', '9780446310789', 11.49, 25)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(4, 'The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 12.99, 17)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(5, 'Fahrenheit 451', 'Ray Bradbury', '9781451673319', 8.36, 41)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(6, 'The Count of Monte Cristo', 'Alexandre Dumas', '9789388423113', 13.99, 13)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(7, 'Lord of the Flies', 'William Golding', '9780399501487', 5.79, 74)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(8, 'Frankenstein', 'Mary Shelley', '9780486282114', 5.99, 33)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(9, 'The Hitchhiker’s Guide to the Galaxy', 'Douglas Adams', '9780671432416', 6.70, 8)`,
    );
    await queryRunner.query(
      `INSERT INTO "book" VALUES(10, 'War and Peace', 'Leo Tolstoy', '9781400079988', 19.29, 3)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user_roles_role"`);
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);
    await queryRunner.query(`DELETE FROM "book"`);
  }
}
