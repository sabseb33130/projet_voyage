import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

let cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet.crossOriginResourcePolicy({ policy: 'same-site' }));
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('projetvoyage')
    .setDescription('Laissez vos souvenirs vous faire voyager')
    .setVersion('1.0')
    .addTag('voyage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
