import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities/project.entity';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { User, UserSchema } from '../auth/entity/User.schema';
import { Image, ImageSchema } from '../images/entities/image.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        useFactory: () => {
          const schema = ProjectSchema;
          schema.plugin(AutoIncrementID, {
            field: 'projectId',
            startAt: 1,
            incrementBy: 1,
          });

          return schema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Image.name,
        useFactory: () => {
          return ImageSchema;
        },
      },
      {
        name: Category.name,
        useFactory: () => {
          return CategorySchema;
        },
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
