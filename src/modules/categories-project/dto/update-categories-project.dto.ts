import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesProjectDto } from './create-categories-project.dto';

export class UpdateCategoriesProjectDto extends PartialType(CreateCategoriesProjectDto) {}
