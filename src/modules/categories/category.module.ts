import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoriesEntity } from '../../entities/categories.entity';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { JwtModule } from '@nestjs/jwt';
import { ProductEntity } from '../../entities/product.entity';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([CategoriesEntity, ProductEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, PaginationService],
})
export class CategoryModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CategoryController);
  }
}
