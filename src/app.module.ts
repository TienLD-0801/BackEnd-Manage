import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './modules/auth/user.module';
import { ProductModule } from './modules/products/product.module';
import { OrderModule } from './modules/orderCut/order.module';
import { CategoryModule } from './modules/categories/category.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Module } from '@nestjs/common';
import dotenv from 'dotenv';
import dbConfig from './config/db/mySql';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid dataSource options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
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
