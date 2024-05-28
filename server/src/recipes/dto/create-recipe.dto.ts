import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  category: string | 'Uncategorized';

  @IsString()
  @IsNotEmpty()
  cuisine: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @IsNotEmpty()
  keywords: string;

  @IsString()
  @IsOptional()
  image?: string;
}
