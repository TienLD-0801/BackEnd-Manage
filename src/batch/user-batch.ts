import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthController } from '../modules/auth/user.controller';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userController = app.get(AuthController);

  function generateRandomNumberNotDuplicate() {
    const numbers = Array(1000000).fill(0);
    let count = 0;
    while (count < 6) {
      const randomNumber = Math.floor(Math.random() * 1000000);

      if (!numbers.includes(randomNumber)) {
        numbers[count] = randomNumber;
        count++;
      }
    }

    return numbers[5];
  }

  for (let i = 0; i < 1000; i++) {
    const user = {
      name: `user${generateRandomNumberNotDuplicate()}`,
      email: `user${generateRandomNumberNotDuplicate()}@example.com`,
      password: '123456789',
      date_of_birth: '2000-01-08',
      card_id: `231${generateRandomNumberNotDuplicate()}`,
      phone: `0329${generateRandomNumberNotDuplicate()}`,
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
