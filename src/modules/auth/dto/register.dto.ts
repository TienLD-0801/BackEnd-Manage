import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @MaxLength(32, { message: 'The length invalid' })
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty' })
  password: string;

  @IsNumber()
  @IsOptional()
  role?: number;
}
