import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCategory: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
