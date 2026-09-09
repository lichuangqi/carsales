import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: [process.env.COOKIE_KEY ?? 'development-only-key'],
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
