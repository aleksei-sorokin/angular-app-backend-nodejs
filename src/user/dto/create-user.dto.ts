import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be more the 6 symbols' })
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  job_title: string;

  @IsOptional()
  tech_stack: string[];
}
