import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateCrmCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsNotEmpty()
  speach: string;
}
