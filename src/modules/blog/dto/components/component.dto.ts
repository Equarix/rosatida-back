import {
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ComponentType } from '../../enum/ComponentEnum';
import { HeroComponentDto } from './hero.dto';
import { Type } from 'class-transformer';

export class ComponentDto {
  @IsEnum(ComponentType)
  @IsNotEmpty()
  type: ComponentType;

  @ValidateIf((o: ComponentDto) => o.type === ComponentType.HERO)
  @ValidateNested()
  @Type(() => HeroComponentDto)
  @IsNotEmpty()
  heroComponent: HeroComponentDto;
}
