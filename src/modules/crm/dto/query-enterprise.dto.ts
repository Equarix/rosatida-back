import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusTracking } from '../entites/tracking.entityp';

export class QueryEnterpriseDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsEnum(StatusTracking)
  @IsOptional()
  trackingStatus?: StatusTracking;
}
