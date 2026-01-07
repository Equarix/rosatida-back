import { Module } from '@nestjs/common';
import { BlogPublicService } from './blog-public.service';
import { BlogPublicController } from './blog-public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/blog/entities/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [BlogPublicController],
  providers: [BlogPublicService],
})
export class BlogPublicModule {}
