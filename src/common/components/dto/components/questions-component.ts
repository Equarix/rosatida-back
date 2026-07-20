import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class QuestionComponentDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class QuestionsComponentDto {
  @IsString()
  @IsOptional()
  subHeading: string;

  @IsString()
  @IsOptional()
  header: string;

  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => QuestionComponentDto)
  @ArrayMinSize(1)
  questions: QuestionComponentDto[];
}
