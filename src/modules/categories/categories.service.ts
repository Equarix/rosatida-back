import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { createSlug } from '../../common/utils/create-slug';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const slug = createSlug(name);

    const createdCategory = await this.categoryModel.create({
      ...createCategoryDto,
      slug,
    });
    return createdCategory.save();
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: number) {
    const category = await this.categoryModel
      .findOne({ categoryId: id })
      .exec();
    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const findCategory = await this.categoryModel
      .findOne({ categoryId: id })
      .exec();
    if (!findCategory) {
      throw new HttpException('Category not found', 404);
    }

    const { name } = updateCategoryDto;

    const slug = createSlug(name);

    await this.categoryModel
      .updateOne(
        { categoryId: id },
        {
          ...updateCategoryDto,
          slug,
        },
      )
      .exec();

    return this.categoryModel.findOne({ categoryId: id }).exec();
  }

  async remove(id: number) {
    const findCategory = await this.categoryModel
      .findOne({ categoryId: id })
      .exec();
    if (!findCategory) {
      throw new HttpException('Category not found', 404);
    }

    await this.categoryModel
      .updateOne({ categoryId: id }, { status: false })
      .exec();

    return this.categoryModel.findOne({ categoryId: id }).exec();
  }
}
