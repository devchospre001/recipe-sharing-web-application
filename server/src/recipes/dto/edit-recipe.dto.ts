import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditRecipeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  cuisine?: string;

  @IsString()
  @IsOptional()
  instructions?: string;

  @IsArray()
  @IsOptional()
  keywords?: Array<string>;

  @IsString()
  @IsOptional()
  image?: string;
}
