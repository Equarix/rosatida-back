import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEnterprise } from './entities/categorie.entityp';
import { CreateCrmCategoryDto } from './dto/create-crm-category.dto';
import { UpdateCrmCategoryDto } from './dto/update-crm-category.dto';

@Injectable()
export class CrmCategoriesService {
  constructor(
    @InjectRepository(CategoryEnterprise)
    private readonly categoryRepository: Repository<CategoryEnterprise>,
  ) {}

  async create(createCrmCategoryDto: CreateCrmCategoryDto): Promise<CategoryEnterprise> {
    const newCategory = this.categoryRepository.create(createCrmCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<CategoryEnterprise[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEnterprise> {
    const category = await this.categoryRepository.findOne({
      where: { categoryEnterpriseId: id },
    });

    if (!category) {
      throw new HttpException('CRM Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async update(
    id: number,
    updateCrmCategoryDto: UpdateCrmCategoryDto,
  ): Promise<CategoryEnterprise> {
    const category = await this.findOne(id);
    Object.assign(category, updateCrmCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<CategoryEnterprise> {
    const category = await this.findOne(id);
    category.status = false;
    return await this.categoryRepository.save(category);
  }
}
