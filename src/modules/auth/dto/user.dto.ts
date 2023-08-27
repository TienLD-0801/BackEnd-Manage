import { IsOptional } from 'class-validator';
import { RegisterDto } from './register.dto';

export class UserDto extends RegisterDto {
  @IsOptional()
  password: string;
}
