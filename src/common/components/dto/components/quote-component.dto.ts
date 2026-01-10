import { IsNotEmpty, IsString } from 'class-validator';

export class QuoteComponentDto {
  @IsString()
  @IsNotEmpty()
  quoteText: string;

  @IsString()
  @IsNotEmpty()
  userImage: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  userPosition: string;
}
