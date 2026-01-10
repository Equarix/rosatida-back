import { Module } from '@nestjs/common';
import { BlogPublicService } from './blog-public.service';
import { BlogPublicController } from './blog-public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/blog/entities/blog.entity';
import {
  Category,
  CategorySchema,
} from 'src/modules/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [BlogPublicController],
  providers: [BlogPublicService],
})
export class BlogPublicModule {}
