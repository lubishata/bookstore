import { DataSource } from 'typeorm';
import { Book } from './books/entities/book.entity';
import { CreateBookTable1689453264837 } from './migrations/1689453264837-CreateBookTable';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  migrations: [CreateBookTable1689453264837],
  entities: [Book],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
