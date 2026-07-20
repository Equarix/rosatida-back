import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
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

  @IsBoolean()
  @IsNotEmpty()
  isPage: boolean;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  technologies: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => ComponentDto)
  components: ComponentDto[];
}
