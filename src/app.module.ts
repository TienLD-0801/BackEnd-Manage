import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './modules/auth/user.module';
import { ProductModule } from './modules/products/product.module';
import { OrderModule } from './modules/orders/order.module';
import { CategoryModule } from './modules/categories/category.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Module } from '@nestjs/common';
import dbConfig from './config/db/mySql';
import { GlobalModule } from './modules/global/global.module';
import { UploadModule } from './modules/upload/upload.module';
import { PaginationModule } from './modules/pagination/pagination.module';

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
    GlobalModule,
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    PaginationModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
