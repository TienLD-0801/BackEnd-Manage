import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
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

  @MaxLength(50, { message: 'The length of email invalid !' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  email: string;

  @Length(8, 8, {
    message: 'Password must be either 8 characters long !',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  password: string;

  @IsNotEmpty({ message: 'Date is not empty !' })
  date_of_birth: string;

  @Validate(IsValidLengthConstraint)
  @IsString()
  @IsNotEmpty({ message: 'Card id is not empty !' })
  card_id: string;

  @IsString()
  @IsPhoneNumber('VN', {
    message:
      'Invalid phone number or is not empty or min 10 character or not phone number VN!',
  })
  phone: string;

  @IsIn([0, 1], { message: 'Role must be either 0 or 1 !' })
  @IsOptional()
  role?: number;
}
