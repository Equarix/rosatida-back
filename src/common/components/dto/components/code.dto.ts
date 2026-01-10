import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LanguageType } from '../../components/code/codeType';

export class CodeComponentDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(LanguageType)
  @IsNotEmpty()
  type: LanguageType;
}
