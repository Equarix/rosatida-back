import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Project,
  ProjectSchema,
} from 'src/modules/projects/entities/project.entity';
import {
  CategoriesProyect,
  CategoriesProyectSchema,
} from 'src/modules/categories-project/entities/categories-project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: CategoriesProyect.name,
        schema: CategoriesProyectSchema,
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
