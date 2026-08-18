import { PartialType } from '@nestjs/mapped-types';
import { CreateCrmCategoryDto } from './create-crm-category.dto';

export class UpdateCrmCategoryDto extends PartialType(CreateCrmCategoryDto) {}
