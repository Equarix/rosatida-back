import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { User } from '../auth/entity/User.schema';
import { Category } from '../categories/entities/category.entity';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const { categoryId, imageId, ...rest } = createProjectDto;

    const findUser = await this.userModel.findOne({ userId });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const findCategory = await this.categoryModel.findOne({ categoryId });

    if (!findCategory) {
      throw new HttpException('Category not found', 404);
    }

    const findImage = await this.imageModel.findOne({ imageId });

    if (!findImage) {
      throw new HttpException('Image not found', 404);
    }

    const newProject = await this.projectModel.create({
      ...rest,
      user: findUser._id,
      category: findCategory._id,
      image: findImage._id,
    });

    return newProject.save();
  }

  findAll() {
    return this.projectModel
      .find()
      .populate('user')
      .populate('category')
      .populate('image');
  }

  async findOne(id: number) {
    const project = await this.projectModel
      .findOne({ projectId: id })
      .populate('user')
      .populate('category')
      .populate('image');

    if (!project) {
      throw new HttpException('Project not found', 404);
    }

    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
