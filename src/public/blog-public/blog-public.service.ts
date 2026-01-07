import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/common/interface/mongo-types';
import { Blog } from 'src/modules/blog/entities/blog.entity';

@Injectable()
export class BlogPublicService {
  constructor(@InjectModel(Blog.name) private blogSchema: Model<Blog>) {}
  async findAll() {
    const blogs = await this.blogSchema
      .find({
        status: true,
      })
      .populate('image')
      .populate('category')
      .populate('user')
      .exec();

    return blogs.map((blog) => {
      const userObject = blog.user as unknown as UserModel;

      const name = userObject.toObject().username;

      return {
        ...blog.toObject(),
        user: {
          name,
        },
      };
    });
  }
}
