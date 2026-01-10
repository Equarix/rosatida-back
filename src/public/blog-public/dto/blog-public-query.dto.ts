import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BlogPublicQueryDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  limit: number;
}
