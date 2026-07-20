import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesProyect } from 'src/modules/categories-project/entities/categories-project.entity';

@Injectable()
export class CategoryProjectsService {
  constructor(
    @InjectModel(CategoriesProyect.name)
    private categoryModel: Model<CategoriesProyect>,
  ) {}

  getAll() {
    return this.categoryModel
      .find({
        status: true,
      })
      .exec();
  }
}
