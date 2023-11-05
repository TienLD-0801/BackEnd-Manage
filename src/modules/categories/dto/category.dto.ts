import { IsNotEmpty, MaxLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'productCategory cannot be empty' })
  @MaxLength(10, { message: 'Product category name max length 10 character !' })
  categoryName: string;
}
