import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/modules/categories/entities/category.entity';

@Injectable()
export class CategoryPublicService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  getAll() {
    return this.categoryModel
      .find({
        status: true,
      })
      .exec();
  }
}
