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
  price: number;

  @Column()
  categoryId: number;

  @Column()
  urlImg: string;

  @Column()
  nameImg: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: CategoriesEntity;
}
