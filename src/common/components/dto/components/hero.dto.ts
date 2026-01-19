import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ColorEnum } from '../../../../modules/categories/enum/ColorEnum';

export class SpanHeroComponentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(ColorEnum)
  @IsNotEmpty()
  color: ColorEnum;
}

export class HeroComponentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested()
  @Type(() => SpanHeroComponentDto)
  @IsNotEmpty()
  span: SpanHeroComponentDto;

  @IsString()
  @IsOptional()
  buttonLive?: string;

  @IsString()
  @IsOptional()
  buttonDemo?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
