import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'order-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
