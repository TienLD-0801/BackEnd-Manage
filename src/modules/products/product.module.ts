import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from '../../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { MulterModule } from '@nestjs/platform-express';
import { ImageService } from './image-upload.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([ProductEntity]),
    MulterModule.registerAsync({
      useClass: ImageService,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImageService],
})
export class ProductModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
