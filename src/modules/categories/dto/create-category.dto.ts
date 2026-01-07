import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ColorEnum } from '../enum/ColorEnum';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ColorEnum)
  @IsNotEmpty()
  color: ColorEnum;
}
