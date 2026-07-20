import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { User } from '../auth/entity/User.schema';
import { CategoriesProyect } from '../categories-project/entities/categories-project.entity';
import { Image } from '../images/entities/image.entity';
import { createSlug } from '../../common/utils/create-slug';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(CategoriesProyect.name)
    private categoryModel: Model<CategoriesProyect>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const { categoryId, imageId, ...rest } = createProjectDto;

    const findUser = await this.userModel.findOne({ userId });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const findCategory = await this.categoryModel.findOne({
      category_proyectId: categoryId,
    });

    if (!findCategory) {
      throw new HttpException('Category not found', 404);
    }

    const findImage = await this.imageModel.findOne({ imageId });

    if (!findImage) {
      throw new HttpException('Image not found', 404);
    }

    const slug = createSlug(rest.projectName);

    const newProject = await this.projectModel.create({
      ...rest,
      projectSlug: slug,
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

  async update(id: number, updateProjectDto: UpdateProjectDto, userId: number) {
    const project = await this.projectModel.findOne({ projectId: id });

    if (!project) {
      throw new HttpException('Project not found', 404);
    }

    const { categoryId, imageId, ...rest } = updateProjectDto;

    const findUser = await this.userModel.findOne({ userId });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const findCategory = await this.categoryModel.findOne({
      category_proyectId: categoryId,
    });

    if (!findCategory) {
      throw new HttpException('Category not found', 404);
    }

    const findImage = await this.imageModel.findOne({ imageId });

    if (!findImage) {
      throw new HttpException('Image not found', 404);
    }

    const slug = createSlug(rest.projectName);

    const updatedProject = await this.projectModel.findOneAndUpdate(
      { projectId: id },
      {
        ...rest,
        projectSlug: slug,
        user: findUser._id,
        category: findCategory._id,
        image: findImage._id,
      },
    );
    return updatedProject;
  }

  async remove(id: number) {
    const project = await this.projectModel.findOneAndDelete({ projectId: id });

    if (!project) {
      throw new HttpException('Project not found', 404);
    }

    const updatedProject = await this.projectModel.findOneAndUpdate(
      { projectId: id },
      {
        status: false,
      },
    );

    return updatedProject;
  }
}
