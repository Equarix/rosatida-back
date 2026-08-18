import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmCategoriesService } from './crm-categories.service';
import { CrmCategoriesController } from './crm-categories.controller';
import { CategoryEnterprise } from './entities/categorie.entityp';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEnterprise])],
  controllers: [CrmCategoriesController],
  providers: [CrmCategoriesService],
  exports: [CrmCategoriesService],
})
export class CrmCategoriesModule {}
