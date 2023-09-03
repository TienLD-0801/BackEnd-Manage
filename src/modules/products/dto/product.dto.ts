import { IsNotEmpty, MaxLength } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'product name is not empty !' })
  productName: string;

  @IsNotEmpty({ message: 'product type is not empty !' })
  productType: string;

  @IsNotEmpty({ message: 'url is not empty !' })
  urlImg: string;

  @MaxLength(80, { message: 'Description the length invalid !' })
  description?: string;

  @IsNotEmpty({ message: 'price  is not empty !' })
  price: number;
}
