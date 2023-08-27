import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCutEntity } from '../../entities/orderCut.entity';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCutEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    //consumer.apply(AuthMiddleware).forRoutes(OrderController);
  }
}
