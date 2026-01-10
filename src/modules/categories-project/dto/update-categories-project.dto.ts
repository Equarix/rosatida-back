import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesProjectDto } from './create-categories-project.dto';
import { IsBoolean, IsOptional } from 'class-validator';
export class UpdateCategoriesProjectDto extends PartialType(
  CreateCategoriesProjectDto,
) {
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
