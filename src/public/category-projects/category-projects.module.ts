import { Module } from '@nestjs/common';
import { CategoryProjectsService } from './category-projects.service';
import { CategoryProjectsController } from './category-projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoriesProyect,
  CategoriesProyectSchema,
} from 'src/modules/categories-project/entities/categories-project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoriesProyect.name,
        schema: CategoriesProyectSchema,
      },
    ]),
  ],
  controllers: [CategoryProjectsController],
  providers: [CategoryProjectsService],
})
export class CategoryProjectsModule {}
