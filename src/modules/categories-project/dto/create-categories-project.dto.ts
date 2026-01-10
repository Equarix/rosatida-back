import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ColorEnum } from 'src/modules/categories/enum/ColorEnum';
export class CreateCategoriesProjectDto {
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
