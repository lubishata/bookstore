import { Book } from '../src/books/entities/book.entity';
import { Role } from '../src/users/entities/role.entity';
import { User } from '../src/users/entities/user.entity';
import { bookSeedData } from '../seeds/book.seed';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1689716840547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    bookSeedData.forEach((bookSeed) => {
      const book = queryRunner.manager.create(Book, bookSeed);
      queryRunner.manager.save(book);
    });

    let adminRole = queryRunner.manager.create(Role, { name: 'ADMIN' });
    adminRole = await queryRunner.manager.save(adminRole);

    let userRole = queryRunner.manager.create(Role, { name: 'USER' });
    userRole = await queryRunner.manager.save(userRole);

    const admin = queryRunner.manager.create(User, {
      email: 'admin@bookstore.com',
      password: '$2a$10$a2V8Wi38hBfab4Mc5HcNiOQj/njOHHyOy5JLzsyEMcL5qdQ7/RwIG',
    });

    admin.roles = [adminRole, userRole];

    queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user_roles_role"`);
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);
    await queryRunner.query(`DELETE FROM "book"`);
  }
}
