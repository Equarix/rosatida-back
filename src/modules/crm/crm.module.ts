import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { Enterprise } from './entites/enterprise.entityp';
import { Tracking } from './entites/tracking.entityp';
import { CategoryEnterprise } from '../crm-categories/entities/categorie.entityp';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enterprise, Tracking, CategoryEnterprise]),
  ],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
