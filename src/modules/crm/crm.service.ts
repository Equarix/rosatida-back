import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entites/enterprise.entityp';
import { Tracking } from './entites/tracking.entityp';
import { CategoryEnterprise } from '../crm-categories/entities/categorie.entityp';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { QueryEnterpriseDto } from './dto/query-enterprise.dto';
import { ResponseExtras } from 'src/common/interface/types';
import csv from 'csvtojson';
import { CsvData } from './types/csv.interface';

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

  async findAll(
    queryDto: QueryEnterpriseDto,
  ): Promise<ResponseExtras<Enterprise[]>> {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      trackingStatus,
    } = queryDto;

    const queryBuilder = this.enterpriseRepository
      .createQueryBuilder('enterprise')
      .leftJoinAndSelect('enterprise.category', 'category')
      .leftJoinAndSelect('category.speaches', 'speaches')
      .leftJoinAndSelect('enterprise.trackings', 'trackings');

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(enterprise.name) LIKE LOWER(:search) OR LOWER(enterprise.address) LIKE LOWER(:search) OR LOWER(enterprise.phone) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('category.categoryEnterpriseId = :categoryId', {
        categoryId,
      });
    }

    if (trackingStatus) {
      queryBuilder.andWhere('trackings.status = :trackingStatus', {
        trackingStatus,
      });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      metadata: {
        totalItems: total,
        itemCount: data.length,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
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

    if (enterprise.trackings && enterprise.trackings.length > 0) {
      await this.trackingRepository.remove(enterprise.trackings);
    }

    await this.enterpriseRepository.remove(enterprise);
  }

  async handleFileUpload(file: Express.Multer.File, idCategoria: number) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryEnterpriseId: idCategoria },
    });

    if (!category) {
      throw new HttpException(
        'Category Enterprise not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const jsonArray = await csv().fromString(file.buffer.toString('utf8'));

    const parsedData = jsonArray as CsvData[];

    const enterprisesToSave = parsedData.map((data) => {
      const schedule = data['Opening hours'].split(',').map((entry) => {
        const [day, hours] = entry.split('[').map((part) => part.trim());

        const parseDay = day?.replace(':', '').trim();
        const parseHours = hours?.replace(']', '').trim();

        return {
          day: parseDay ?? '',
          hours: parseHours ?? '',
        };
      });

      return this.enterpriseRepository.create({
        name: data.Name,
        address: data.Fulladdress,
        street: data.Street,
        phone: data.Phone,
        reviewCount: parseInt(data['Review Count'], 10) || 0,
        stars: parseFloat(data['Average Rating']) || 0,
        urlGoogleMaps: data['Google Maps URL'],
        lat: data.Latitude,
        lng: data.Longitude,
        website: data.Website,
        schedules: schedule,
        category,
      });
    });

    await this.enterpriseRepository.save(enterprisesToSave);

    return enterprisesToSave;
  }

  async createTracking(
    createTrackingDto: CreateTrackingDto,
  ): Promise<Tracking> {
    const { enterpriseId, ...trackingData } = createTrackingDto;

    const enterprise = await this.enterpriseRepository.findOne({
      where: { enterpriseId },
    });

    if (!enterprise) {
      throw new HttpException('Enterprise not found', HttpStatus.NOT_FOUND);
    }

    const tracking = this.trackingRepository.create({
      ...trackingData,
      enterprise,
    });

    return await this.trackingRepository.save(tracking);
  }

  async updateTracking(
    id: number,
    updateTrackingDto: UpdateTrackingDto,
  ): Promise<Tracking> {
    const { enterpriseId, ...trackingData } = updateTrackingDto;

    const tracking = await this.trackingRepository.findOne({
      where: { trackingId: id },
      relations: { enterprise: true },
    });

    if (!tracking) {
      throw new HttpException('Tracking not found', HttpStatus.NOT_FOUND);
    }

    if (enterpriseId) {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { enterpriseId },
      });

      if (!enterprise) {
        throw new HttpException('Enterprise not found', HttpStatus.NOT_FOUND);
      }
      tracking.enterprise = enterprise;
    }

    Object.assign(tracking, trackingData);
    return await this.trackingRepository.save(tracking);
  }

  async removeTracking(id: number): Promise<void> {
    const tracking = await this.trackingRepository.findOne({
      where: { trackingId: id },
    });

    if (!tracking) {
      throw new HttpException('Tracking not found', HttpStatus.NOT_FOUND);
    }

    await this.trackingRepository.remove(tracking);
  }
}
