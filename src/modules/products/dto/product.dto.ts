import { MinLength, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  categoryId?: number;

  @MinLength(1, { message: 'This field must be than 1 character Nine Dev!' })
  productName?: string;

  @IsNotEmpty()
  price?: number;
}
