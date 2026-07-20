import { Controller, Get } from '@nestjs/common';
import { CategoryProjectsService } from './category-projects.service';

@Controller('public/category-projects')
export class CategoryProjectsController {
  constructor(
    private readonly categoryProjectsService: CategoryProjectsService,
  ) {}

  @Get()
  getAll() {
    return this.categoryProjectsService.getAll();
  }
}
