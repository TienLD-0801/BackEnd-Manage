import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  categoryId: string;

  @Column()
  price: number;

  @Column()
  urlImg: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  category: CategoriesEntity;
}
