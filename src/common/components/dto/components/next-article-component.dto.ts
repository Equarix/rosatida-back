import { IsNotEmpty, IsString } from 'class-validator';

export class NextArticleComponentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  header: string;

  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @IsString()
  @IsNotEmpty()
  articleUrl: string;
}
