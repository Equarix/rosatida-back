import { Color } from '../../../enum/Color.enum';
import { Position } from '../../components/time-line/position.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TimeLineDto {
  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsEnum(Color)
  @IsNotEmpty()
  color: Color;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Position)
  @IsNotEmpty()
  position: Position;
}
