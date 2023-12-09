import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class OrderCutDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  phone: number;

  @IsNotEmpty()
  dateSchedule: Date;
}
