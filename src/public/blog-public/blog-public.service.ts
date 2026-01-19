import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../common/interface/mongo-types';
import { Blog } from '../../modules/blog/entities/blog.entity';
import { BlogPublicQueryDto } from './dto/blog-public-query.dto';
import { Category } from '../../modules/categories/entities/category.entity';

@Injectable()
export class BlogPublicService {
  constructor(
    @InjectModel(Blog.name) private blogSchema: Model<Blog>,
    @InjectModel(Category.name) private categorySchema: Model<Category>,
  ) {}
  async findAll(query: BlogPublicQueryDto) {
    const { category, limit, page, search } = query;

    let categoryFilter = {};

    if (category) {
      const categoryDoc = await this.categorySchema
        .findOne({ slug: category })
        .exec();

      if (!categoryDoc) {
        return {
          data: [],
        };
      }

      categoryFilter = { category: categoryDoc._id };
    }

    const blogs = await this.blogSchema
      .find({
        status: true,
        ...categoryFilter,
        ...(search
          ? {
              title: { $regex: search, $options: 'i' },
            }
          : {}),
      })
      .populate('image')
      .populate('category')
      .populate('user')
      .skip(((page || 1) - 1) * (limit || 10))
      .limit(limit || 10)
      .exec();

    const count = await this.blogSchema.countDocuments({
      status: true,
      ...categoryFilter,
    });

    return {
      data: blogs.map((blog) => {
        const userObject = blog.user as unknown as UserModel;

        const name = userObject.toObject().username;

        return {
          ...blog.toObject(),
          user: {
            name,
          },
        } as unknown as Blog;
      }),
      metadata: {
        totalItems: count,
        itemCount: blogs.length,
        totalPages: Math.ceil(count / (limit || 10)),
        currentPage: page || 1,
      },
    };
  }

  async findOne(slug: string) {
    const blog = await this.blogSchema
      .findOne({ blogSlug: slug, status: true })
      .populate('image')
      .populate('category')
      .populate('user')
      .exec();

    if (!blog) {
      throw new HttpException('Blog not found', 404);
    }

    const userObject = blog.user as unknown as UserModel;
    const name = userObject.toObject().username;

    return {
      ...blog.toObject(),
      user: {
        name,
      },
    };
  }
}
