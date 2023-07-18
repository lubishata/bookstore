import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Book } from './src/books/entities/book.entity';
import { User } from './src/users/entities/user.entity';
import { Role } from './src/users/entities/role.entity';
import { CreateEntityTables1689711781922 } from './migrations/1689711781922-CreateEntityTables';
import { SeedDatabase1689716840547 } from './migrations/1689716840547-SeedDatabase';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: +configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_DATABASE'),
  entities: [Book, User, Role],
  migrations: [CreateEntityTables1689711781922, SeedDatabase1689716840547],
  synchronize: false,
});
