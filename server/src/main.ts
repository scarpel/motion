import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import paths from '@consts/paths';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  mkdirSync(join(__dirname, paths.ASSETS.THUMBNAILS), {
    recursive: true,
  });
  mkdirSync(join(__dirname, paths.ASSETS.VIDEOS), { recursive: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors();

  await app.listen(4000);
}
bootstrap();
