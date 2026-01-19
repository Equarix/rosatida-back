import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesProjectService } from './categories-project.service';
import { CreateCategoriesProjectDto } from './dto/create-categories-project.dto';
import { UpdateCategoriesProjectDto } from './dto/update-categories-project.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { RoleEnum } from '../../common/enum/Role.enum';

@Controller('categories-project')
export class CategoriesProjectController {
  constructor(
    private readonly categoriesProjectService: CategoriesProjectService,
  ) {}

  @Auth([RoleEnum.ADMIN])
  @Post()
  create(@Body() CreateCategoriesProjectDto: CreateCategoriesProjectDto) {
    return this.categoriesProjectService.create(CreateCategoriesProjectDto);
  }

  @Auth([RoleEnum.ADMIN])
  @Get()
  findAll() {
    return this.categoriesProjectService.findAll();
  }

  @Auth([RoleEnum.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesProjectService.findOne(+id);
  }

  @Auth([RoleEnum.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCategoriesProjectDto: UpdateCategoriesProjectDto,
  ) {
    return this.categoriesProjectService.update(
      +id,
      UpdateCategoriesProjectDto,
    );
  }

  @Auth([RoleEnum.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesProjectService.remove(+id);
  }
}
