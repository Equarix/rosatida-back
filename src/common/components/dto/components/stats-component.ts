import { Color } from 'src/common/enum/Color.enum';
import { PositionIcon } from '../../components/stats/stas-component';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StatsComponentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Color)
  @IsNotEmpty()
  color: Color;

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(PositionIcon)
  @IsOptional()
  positionIcon: PositionIcon;
}
