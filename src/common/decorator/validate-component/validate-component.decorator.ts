import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { ComponentDto } from '../../components/dto/component.dto';
import { ComponentType } from '../../components/enum/ComponentEnum';

export function ValidateComponent<T>(
  type: ComponentType,
  dtoClass: new () => T,
  each = false,
) {
  return applyDecorators(
    ValidateIf((o: ComponentDto) => o.type === type),
    ValidateNested({ each }),
    Type(() => dtoClass),
    IsNotEmpty(),
  );
}
