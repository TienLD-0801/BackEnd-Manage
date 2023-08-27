import { MinLength, IsString } from 'class-validator';

export class CategoryDto {
  @MinLength(5, { message: 'This field must be than 5 character Nine Dev!' })
  categoryName?: string;

  @IsString()
  description?: string;
}
