import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { StatusTracking } from '../entites/tracking.entityp';

export class CreateTrackingDto {
  @IsBoolean()
  @IsNotEmpty()
  answered: boolean;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  channel: string;

  @IsEnum(StatusTracking)
  @IsNotEmpty()
  status: StatusTracking;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsNumber()
  @IsNotEmpty()
  enterpriseId: number;
}
