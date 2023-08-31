import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// if (process.env.NODE_ENV) {
//   dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// } else {
//   dotenv.config();
// }
dotenv.config();

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: Number(process.env.RDS_PORT),
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  logger: 'debug',
  charset: 'utf8mb4',
  synchronize: true,
  entities: [path.join(__dirname, '../..', '/entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../..', '/migration/*{.ts,.js}')],
  autoLoadEntities: true,
};
export default dbConfig;
