import { Module } from '@nestjs/common';
import { CategoryPublicService } from './category-public.service';
import { CategoryPublicController } from './category-public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from '../../modules/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryPublicController],
  providers: [CategoryPublicService],
})
export class CategoryPublicModule {}
