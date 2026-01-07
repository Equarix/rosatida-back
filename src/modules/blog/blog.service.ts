import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/entity/User.schema';
import { Category } from '../categories/entities/category.entity';
import { Image } from '../images/entities/image.entity';
import { createSlug } from 'src/common/utils/create-slug';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: number) {
    const { categoryId, imageId, ...rest } = createBlogDto;

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

    const slug = createSlug(rest.blogName);

    const newBlog = await this.blogModel.create({
      ...rest,
      blogSlug: slug,
      user: findUser._id,
      category: findCategory._id,
      image: findImage._id,
    });

    return newBlog.save();
  }

  findAll() {
    return this.blogModel
      .find()
      .populate('user')
      .populate('category')
      .populate('image');
  }

  async findOne(id: number) {
    const blog = await this.blogModel
      .findOne({ blogId: id })
      .populate('user')
      .populate('category')
      .populate('image');

    if (!blog) {
      throw new HttpException('Blog not found', 404);
    }

    return blog;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
