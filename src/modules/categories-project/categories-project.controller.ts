import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesProjectService } from './categories-project.service';
import { CreateCategoriesProjectDto } from './dto/create-categories-project.dto';
import { UpdateCategoriesProjectDto } from './dto/update-categories-project.dto';

@Controller('categories-project')
export class CategoriesProjectController {
  constructor(private readonly categoriesProjectService: CategoriesProjectService) {}

  @Post()
  create(@Body() createCategoriesProjectDto: CreateCategoriesProjectDto) {
    return this.categoriesProjectService.create(createCategoriesProjectDto);
  }

  @Get()
  findAll() {
    return this.categoriesProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesProjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesProjectDto: UpdateCategoriesProjectDto) {
    return this.categoriesProjectService.update(+id, updateCategoriesProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesProjectService.remove(+id);
  }
}
