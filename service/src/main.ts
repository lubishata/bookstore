import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Bookstore')
    .setDescription('Bookstore example service')
    .setVersion('0.1')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const configService = app.get(ConfigService);
  const host = configService.get('SERVER_HOST') || '127.0.0.1';
  const port = +configService.get('SERVER_PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'billing-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port, host);
}
bootstrap();
