import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { User, UserSchema } from '../auth/entity/User.schema';
import { Image, ImageSchema } from '../images/entities/image.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';
import { Blog, BlogSchema } from './entities/blog.entity';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Blog.name,
        useFactory: () => {
          const schema = BlogSchema;
          schema.plugin(AutoIncrementID, {
            field: 'blogId',
            startAt: 1,
            incrementBy: 1,
          });

          return schema;
        },
      },
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
      {
        name: Image.name,
        useFactory: () => {
          return ImageSchema;
        },
      },
      {
        name: Category.name,
        useFactory: () => {
          return CategorySchema;
        },
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
