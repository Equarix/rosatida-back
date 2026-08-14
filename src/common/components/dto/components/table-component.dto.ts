import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum ColumnType {
  TEXT = 'text',
  NUMBER = 'number',
  CURRENCY = 'currency',
  DATE = 'date',
  BOOLEAN = 'boolean',
  IMAGE = 'image',
  LINK = 'link',
}

export class TableColumnDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsEnum(ColumnType)
  @IsNotEmpty()
  type: ColumnType;

  @IsBoolean()
  @IsOptional()
  autoWidth: boolean = true;
}

export class TableRowDto {
  @IsObject()
  @IsNotEmpty()
  values: Record<string, unknown>;
}

export class TableComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableColumnDto)
  columns: TableColumnDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableRowDto)
  rows: TableRowDto[];
}
