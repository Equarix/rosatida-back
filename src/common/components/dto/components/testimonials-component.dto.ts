import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TestimonialsComponent {
  @IsNumber()
  @IsNotEmpty()
  starts: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;
}

export class TestimonialsComponentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => TestimonialsComponent)
  testimonials: TestimonialsComponent[];
}
