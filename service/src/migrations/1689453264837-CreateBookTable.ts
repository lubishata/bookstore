import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookTable1689453264837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          { name: 'title', type: 'varchar' },
          { name: 'author', type: 'varchar' },
          { name: 'isbn', type: 'varchar' },
          { name: 'price', type: 'float' },
          { name: 'quantity', type: 'int' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book');
  }
}
