import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user.entity';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, PaginationService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'api/users', method: RequestMethod.GET },
        { path: 'api/logout', method: RequestMethod.POST },
        { path: 'api/create-user', method: RequestMethod.POST },
        { path: 'api/update-user/:id', method: RequestMethod.PUT },
        { path: 'api/delete-user/:id', method: RequestMethod.DELETE },
      );
  }
}
