import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { SSEModule } from '@/sse/sse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'purchase',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'purchase-consumer',
          },
        },
      },
    ]),
    SSEModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
