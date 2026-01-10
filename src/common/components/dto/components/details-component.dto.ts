import { IsNotEmpty, IsString } from 'class-validator';

export class DetailsComponentDto {
  @IsString()
  @IsNotEmpty()
  header: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
