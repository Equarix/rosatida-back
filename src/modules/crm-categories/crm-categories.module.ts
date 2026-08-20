import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmCategoriesService } from './crm-categories.service';
import { CrmCategoriesController } from './crm-categories.controller';
import { CategoryEnterprise } from './entities/categorie.entityp';
import { Speach } from './entities/speach.entityp';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEnterprise, Speach])],
  controllers: [CrmCategoriesController],
  providers: [CrmCategoriesService],
  exports: [CrmCategoriesService],
})
export class CrmCategoriesModule {}
