import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthController } from '../modules/auth/user.controller';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userController = app.get(AuthController);

  for (let i = 0; i < 5; i++) {
    const user = {
      name: `admin${i}`,
      email: `admin${i}@example.com`,
      password: '123456789',
      age: 20,
      card_id: `23125622${i}`,
      phone: `03294126${i}`,
      role: 0,
    };
    await userController.createUser(user);
  }

  await app.listen(3000, '0.0.0.0', () => {
    new Logger('Application').log(`Init data user table suscesfully`);
  });
  await app.close();
}

bootstrap();
