import { CreateCategoriesProjectDto } from './dto/create-categories-project.dto';
import { UpdateCategoriesProjectDto } from './dto/update-categories-project.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesProyect } from './entities/categories-project.entity';
import { Model } from 'mongoose';
import { createSlug } from '../../common/utils/create-slug';

@Injectable()
export class CategoriesProjectService {
  constructor(
    @InjectModel(CategoriesProyect.name)
    private categoriesProjectModel: Model<CategoriesProyect>,
  ) {}

  async create(createCategoriesProjectDto: CreateCategoriesProjectDto) {
    const { name } = createCategoriesProjectDto;

    const slug = createSlug(name);

    const createdCategoryProject = await this.categoriesProjectModel.create({
      ...createCategoriesProjectDto,
      slug,
    });
    return createdCategoryProject.save();
  }
  findAll() {
    return this.categoriesProjectModel.find().exec();
  }

  async findOne(id: number) {
    const categoriesProyect = await this.categoriesProjectModel
      .findOne({ categoryProyectId: id })
      .exec();
    if (!categoriesProyect) {
      throw new HttpException('Category not found', 404);
    }

    return categoriesProyect;
  }
  async update(
    id: number,
    updateCategoriesProjectDto: UpdateCategoriesProjectDto,
  ) {
    const findCategoriesProyect = await this.categoriesProjectModel
      .findOne({ categoryProyectId: id })
      .exec();
    if (!findCategoriesProyect) {
      throw new HttpException('Category not found', 404);
    }

    const { name } = updateCategoriesProjectDto;
    const slug = createSlug(name);

    await this.categoriesProjectModel
      .updateOne(
        { categoryProyectId: id },
        {
          ...updateCategoriesProjectDto,
          slug,
        },
      )
      .exec();

    return this.categoriesProjectModel
      .findOne({ categoryProyectId: id })
      .exec();
  }
  async remove(id: number) {
    const findCategoriesProyect = await this.categoriesProjectModel
      .findOne({ categoryProyectId: id })
      .exec();
    if (!findCategoriesProyect) {
      throw new HttpException('Category not found', 404);
    }

    await this.categoriesProjectModel
      .updateOne({ categoryProyectId: id }, { status: false })
      .exec();

    return this.categoriesProjectModel
      .findOne({ categoryProyectId: id })
      .exec();
  }
}
