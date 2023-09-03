import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 32, { message: 'The length of name invalid !' })
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty({ message: 'Card id is not empty !' })
  card_id: string;

  @IsString()
  @IsPhoneNumber('VN', { message: 'Invalid phone number' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  password: string;

  @IsNumber()
  @IsOptional()
  role?: number;
}
