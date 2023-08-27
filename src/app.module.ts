import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './modules/auth/user.module';
import { ProductModule } from './modules/products/product.module';
import { OrderModule } from './modules/orderCut/order.module';
import { CategoryModule } from './modules/categories/category.module';
import { CategoriesEntity } from './entities/categories.entity';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { OrderCutEntity } from './entities/orderCut.entity';
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'ohayo_community',
      entities: [CategoriesEntity, UserEntity, ProductEntity, OrderCutEntity],
      synchronize: false,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
