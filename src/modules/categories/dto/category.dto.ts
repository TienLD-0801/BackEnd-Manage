import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'productCategory cannot be empty' })
  @MinLength(5, { message: 'Product category min length 5 character !' })
  @MaxLength(10, { message: 'Product category max length 10 character !' })
  productCategory: string;
}
