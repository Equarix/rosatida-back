import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEnterprise } from './entities/categorie.entityp';
import { CreateCrmCategoryDto } from './dto/create-crm-category.dto';
import { UpdateCrmCategoryDto } from './dto/update-crm-category.dto';
import { Speach } from './entities/speach.entityp';

@Injectable()
export class CrmCategoriesService {
  constructor(
    @InjectRepository(CategoryEnterprise)
    private readonly categoryRepository: Repository<CategoryEnterprise>,
    @InjectRepository(Speach)
    private readonly speachRepository: Repository<Speach>,
  ) {}

  async create(
    createCrmCategoryDto: CreateCrmCategoryDto,
  ): Promise<CategoryEnterprise> {
    const newCategory = this.categoryRepository.create(createCrmCategoryDto);

    const category = await this.categoryRepository.save(newCategory);

    const speaches = createCrmCategoryDto.speaches.map((speachDto) => {
      const newSpeach = this.speachRepository.create({
        ...speachDto,
        category,
      });
      return newSpeach;
    });

    await this.speachRepository.save(speaches);

    return {
      ...category,
      speaches,
    };
  }

  async findAll(): Promise<CategoryEnterprise[]> {
    return await this.categoryRepository.find({
      relations: {
        speaches: true,
      },
    });
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
    const updatedCategory = await this.categoryRepository.save(category);

    await this.speachRepository.delete({
      category: { categoryEnterpriseId: id },
    });

    if (
      updateCrmCategoryDto.speaches &&
      updateCrmCategoryDto.speaches.length > 0
    ) {
      const speaches = updateCrmCategoryDto.speaches.map((speachDto) => {
        const newSpeach = this.speachRepository.create({
          ...speachDto,
          category: updatedCategory,
        });
        return newSpeach;
      });

      await this.speachRepository.save(speaches);
    }

    return updatedCategory;
  }

  async remove(id: number): Promise<CategoryEnterprise> {
    const category = await this.findOne(id);
    category.status = false;
    return await this.categoryRepository.save(category);
  }
}
