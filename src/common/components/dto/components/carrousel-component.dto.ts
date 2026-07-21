import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CarrouselComponentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  urls: string[];
}
