import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const cookieKey = process.env.COOKIE_KEY;
  if (!cookieKey) {
    throw new Error('COOKIE_KEY environment variable is required');
  }

  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: [cookieKey],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
