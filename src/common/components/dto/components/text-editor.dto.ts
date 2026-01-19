import { IsArray, IsOptional, IsString } from 'class-validator';

export class TextEditorComponentDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsOptional()
  content: any;
}
