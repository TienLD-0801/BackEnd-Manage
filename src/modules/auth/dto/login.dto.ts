import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address !' })
  @IsNotEmpty({ message: 'Email cannot be empty !' })
  @ApiProperty({ type: String, example: 'example@gmail.com' })
  email: string;

  @IsString({ message: 'Password must be a string !' })
  @IsNotEmpty({ message: 'Password cannot be empty !' })
  @ApiProperty({ type: String, example: '123456789' })
  password: string;
}
