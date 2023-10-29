import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Initialize cls-hooked
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
    cors: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const port = process.env.APP_PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    new Logger('Application').log(
      `Service started successfully at port ${port}`,
    );
  });
}

bootstrap();
