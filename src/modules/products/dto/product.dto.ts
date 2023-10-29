import { IsNotEmpty, MaxLength } from 'class-validator';

export class ProductDto {
  @MaxLength(10, { message: 'product name the length invalid !' })
  @IsNotEmpty({ message: 'product name is not empty !' })
  productName: string;

  @IsNotEmpty({ message: 'product category name is not empty !' })
  categoryName: string;

  @MaxLength(80, { message: 'Description the length invalid !' })
  description?: string;

  @IsNotEmpty({ message: 'price  is not empty !' })
  price: number;
}
