import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty({ message: 'Page cannot be empty !' })
  @ApiProperty({ type: Number, example: 1 })
  page: number;

  @IsNotEmpty({ message: 'Limit cannot be empty !' })
  @ApiProperty({ type: Number, example: 20 })
  limit: number;
}
