import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadService } from '../upload/upload.service';
import { ProductEntity } from '../../entities/product.entity';
import { CategoriesEntity } from '../../entities/categories.entity';
import { PaginationService } from '../pagination/pagination.service';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoriesEntity]),
    MulterModule.registerAsync({
      useClass: UploadService,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, UploadService, PaginationService],
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
