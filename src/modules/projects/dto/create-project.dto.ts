import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ComponentDto } from '../../../common/components/dto/component.dto';
import { Type } from 'class-transformer';
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  imageId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => ComponentDto)
  components: ComponentDto[];
}
