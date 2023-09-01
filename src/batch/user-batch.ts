import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../modules/auth/user.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService);

  for (let i = 0; i < 5; i++) {
    const user = {
      name: `admin${i}`,
      email: `admin${i}@example.com`,
      password: '123456',
      role: 0,
    };
    await userService.createUser(user);
  }

  await app.listen(3000, '0.0.0.0', () => {
    new Logger('Application').log(`Init data user table suscesfully`);
  });
  await app.close();
}

bootstrap();
