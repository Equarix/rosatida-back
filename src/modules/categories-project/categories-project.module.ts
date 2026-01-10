import { Module } from '@nestjs/common';
import { CategoriesProjectService } from './categories-project.service';
import { CategoriesProjectController } from './categories-project.controller';

@Module({
  controllers: [CategoriesProjectController],
  providers: [CategoriesProjectService],
})
export class CategoriesProjectModule {}
