import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleDto {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  hours: string;
}

export class CreateEnterpriseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsOptional()
  reviewCount?: number;

  @IsNumber()
  @IsOptional()
  stars?: number;

  @IsString()
  @IsOptional()
  urlGoogleMaps?: string;

  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  lng?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  @IsOptional()
  schedules?: ScheduleDto[];

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
