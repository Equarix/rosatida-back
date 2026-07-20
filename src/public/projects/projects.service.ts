import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesProyect } from 'src/modules/categories-project/entities/categories-project.entity';
import { Project } from 'src/modules/projects/entities/project.entity';
import { BlogPublicQueryDto } from '../blog-public/dto/blog-public-query.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(CategoriesProyect.name)
    private categoryModel: Model<CategoriesProyect>,
  ) {}

  async findAll(query: BlogPublicQueryDto) {
    const { category, search, page = 1, limit = 10 } = query;

    let categoryFilter = {};

    if (category) {
      const categoryDoc = await this.categoryModel
        .findOne({ slug: category })
        .exec();

      if (!categoryDoc) {
        return {
          data: [],
        };
      }

      categoryFilter = { category: categoryDoc._id };
    }

    const projects = await this.projectModel
      .find({
        status: true,
        ...categoryFilter,
        ...(search
          ? {
              title: { $regex: search, $options: 'i' },
            }
          : {}),
      })
      .select('-components')
      .populate('image')
      .populate('category')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await this.projectModel.countDocuments({
      status: true,
      ...categoryFilter,
    });

    return {
      data: projects,
      metadata: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemCount: projects.length,
      },
    };
  }

  async findOne(slug: string) {
    const project = await this.projectModel
      .findOne({ projectSlug: slug, status: true })
      .populate('image')
      .populate('category')
      .exec();

    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    return project;
  }
}
