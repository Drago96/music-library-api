import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 24)
  @IsNotEmpty()
  password: string;
}
