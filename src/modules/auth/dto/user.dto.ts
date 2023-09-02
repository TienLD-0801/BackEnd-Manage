import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create_user.dto';

export class UserDto extends CreateUserDto {
  @IsOptional()
  password: string;
}
