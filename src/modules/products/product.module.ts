import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from '../../entities/product.entity';
import { CategoriesEntity } from '../../entities/categories.entity';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { UploadService } from '../upload/upload.service';

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
  providers: [ProductService, UploadService],
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
