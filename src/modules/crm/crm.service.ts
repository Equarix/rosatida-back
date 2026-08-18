import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entites/enterprise.entityp';
import { Tracking } from './entites/tracking.entityp';
import { CategoryEnterprise } from '../crm-categories/entities/categorie.entityp';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
    @InjectRepository(CategoryEnterprise)
    private readonly categoryRepository: Repository<CategoryEnterprise>,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    const { categoryId, ...enterpriseData } = createEnterpriseDto;

    const category = await this.categoryRepository.findOne({
      where: { categoryEnterpriseId: categoryId },
    });

    if (!category) {
      throw new HttpException(
        'Category Enterprise not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const enterprise = this.enterpriseRepository.create({
      ...enterpriseData,
      category,
    });

    return await this.enterpriseRepository.save(enterprise);
  }

  async findAll(): Promise<Enterprise[]> {
    return await this.enterpriseRepository.find({
      relations: {
        category: true,
        trackings: true,
      },
    });
  }

  async findOne(id: number): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOne({
      where: { enterpriseId: id },
      relations: {
        category: true,
        trackings: true,
      },
    });

    if (!enterprise) {
      throw new HttpException('Enterprise not found', HttpStatus.NOT_FOUND);
    }

    return enterprise;
  }

  async update(
    id: number,
    updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<Enterprise> {
    const { categoryId, ...enterpriseData } = updateEnterpriseDto;
    const enterprise = await this.findOne(id);

    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { categoryEnterpriseId: categoryId },
      });

      if (!category) {
        throw new HttpException(
          'Category Enterprise not found',
          HttpStatus.NOT_FOUND,
        );
      }
      enterprise.category = category;
    }

    Object.assign(enterprise, enterpriseData);
    return await this.enterpriseRepository.save(enterprise);
  }

  async remove(id: number): Promise<void> {
    const enterprise = await this.findOne(id);

    // Remove associated trackings before removing enterprise
    if (enterprise.trackings && enterprise.trackings.length > 0) {
      await this.trackingRepository.remove(enterprise.trackings);
    }

    await this.enterpriseRepository.remove(enterprise);
  }

  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
