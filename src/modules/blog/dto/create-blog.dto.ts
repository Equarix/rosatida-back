import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ComponentDto } from 'src/common/components/dto/component.dto';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  blogName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  blogKey: string;

  @IsNumber()
  @IsNotEmpty()
  imageId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  timeline: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsNotEmpty({ each: true })
  @Type(() => ComponentDto)
  components: ComponentDto[];
}
