import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NftsModule } from './nfts/nfts.module';

async function bootstrap() {
  const app = await NestFactory.create(NftsModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The blockchain Authenticity API documents')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
