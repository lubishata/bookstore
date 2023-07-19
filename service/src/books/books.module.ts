import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { SSEModule } from '../sse/sse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    ClientsModule.registerAsync([
      {
        name: 'BOOK_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.getOrThrow('KAFKA_CLIENT_ID'),
              brokers: [configService.getOrThrow('KAFKA_BROKER')],
            },
            consumer: {
              groupId: configService.getOrThrow('KAFKA_GROUP_ID'),
            },
          },
        }),
      },
    ]),
    SSEModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
