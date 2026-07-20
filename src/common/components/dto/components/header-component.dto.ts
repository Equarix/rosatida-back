import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class HeaderButtonComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  key: string;

  @IsBoolean()
  @IsNotEmpty()
  isExternal: boolean;
}

export class HeaderItemComponentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  key: string;
}

export class HeaderComponentDto {
  @IsString()
  @IsNotEmpty()
  proyectName: string;

  @IsUrl()
  @IsNotEmpty()
  proyectIcon: string;

  @IsBoolean()
  @IsNotEmpty()
  isFixed: boolean;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => HeaderButtonComponentDto)
  buttons: HeaderButtonComponentDto[];

  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => HeaderItemComponentDto)
  @ArrayMinSize(1)
  items: HeaderItemComponentDto[];
}
