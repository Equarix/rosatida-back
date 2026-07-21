import { IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsNotEmpty()
  feature: boolean;
}
