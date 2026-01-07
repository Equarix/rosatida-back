import { Controller, Get } from '@nestjs/common';
import { CategoryPublicService } from './category-public.service';

@Controller('public/category')
export class CategoryPublicController {
  constructor(private readonly categoryPublicService: CategoryPublicService) {}

  @Get()
  getAllCategories() {
    return this.categoryPublicService.getAll();
  }
}
