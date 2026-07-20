import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class ImagesCaptionDto {
  @IsUrl()
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsString()
  @IsOptional()
  icon: string;
}

export class ImageCaptionComponentDto {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsOptional()
  @IsString()
  subHeading: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ImagesCaptionDto)
  @ArrayMinSize(1)
  images: ImagesCaptionDto[];
}
