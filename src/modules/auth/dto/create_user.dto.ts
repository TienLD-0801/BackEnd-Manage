import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidLength', async: false })
class IsValidLengthConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.length === 9 || text.length === 12;
  }

  defaultMessage() {
    return 'Card ID must be either 9 or 12 characters long !';
  }
}

export class CreateUserDto {
  @Length(1, 32, { message: 'The length of name invalid !' })
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  name: string;

  @MaxLength(50, { message: 'The length of name invalid !' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  email: string;

  @Min(18, { message: 'Age must be at least 18 !' })
  @Max(60, { message: 'Age must be at most 60 !' })
  @IsInt()
  age: number;

  @Validate(IsValidLengthConstraint)
  @IsString()
  @IsNotEmpty({ message: 'Card id is not empty !' })
  card_id: string;

  @IsString()
  @IsPhoneNumber('VN', { message: 'Invalid phone number or is not empty !' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  password: string;

  @IsIn([0, 1], { message: 'Role must be either 0 or 1 !' })
  @IsOptional()
  role?: number;
}
