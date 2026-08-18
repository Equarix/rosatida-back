import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CrmCategoriesService } from './crm-categories.service';
import { CreateCrmCategoryDto } from './dto/create-crm-category.dto';
import { UpdateCrmCategoryDto } from './dto/update-crm-category.dto';
import { Auth } from 'src/common/decorator/auth/auth.decorator';

@Auth()
@Controller('crm-categories')
export class CrmCategoriesController {
  constructor(private readonly crmCategoriesService: CrmCategoriesService) {}

  @Post()
  create(@Body() createCrmCategoryDto: CreateCrmCategoryDto) {
    return this.crmCategoriesService.create(createCrmCategoryDto);
  }

  @Get()
  findAll() {
    return this.crmCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.crmCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCrmCategoryDto: UpdateCrmCategoryDto,
  ) {
    return this.crmCategoriesService.update(id, updateCrmCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.crmCategoriesService.remove(id);
  }
}
