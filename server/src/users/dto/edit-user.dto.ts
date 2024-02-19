import { IsEmail, IsString, IsOptional } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;
  lastName?: string; // test this
}
