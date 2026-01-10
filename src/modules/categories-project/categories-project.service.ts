import { Injectable } from '@nestjs/common';
import { CreateCategoriesProjectDto } from './dto/create-categories-project.dto';
import { UpdateCategoriesProjectDto } from './dto/update-categories-project.dto';

@Injectable()
export class CategoriesProjectService {
  create(createCategoriesProjectDto: CreateCategoriesProjectDto) {
    return 'This action adds a new categoriesProject';
  }

  findAll() {
    return `This action returns all categoriesProject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesProject`;
  }

  update(id: number, updateCategoriesProjectDto: UpdateCategoriesProjectDto) {
    return `This action updates a #${id} categoriesProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesProject`;
  }
}
