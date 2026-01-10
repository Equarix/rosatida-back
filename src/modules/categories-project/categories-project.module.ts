import { Module } from '@nestjs/common';
import { CategoriesProjectService } from './categories-project.service';
import { CategoriesProjectController } from './categories-project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { CategoriesProyect, CategoriesProyectSchema } from './entities/categories-project.entity';


@Module({
  imports: [
      MongooseModule.forFeatureAsync([
        {
          name: CategoriesProyect.name,
          useFactory: () => {
            const schema = CategoriesProyectSchema;
            schema.plugin(AutoIncrementID, {
              field: 'category_proyectId',
              startAt: 1,
              incrementBy: 1,
            });
            return schema;
          },
        },
      ]),
    ],
    controllers: [CategoriesProjectController],
    providers: [CategoriesProjectService],
})
export class CategoriesProjectModule {}
