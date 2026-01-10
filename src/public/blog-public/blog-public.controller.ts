import { Controller, Get, Query } from '@nestjs/common';
import { BlogPublicService } from './blog-public.service';
import { BlogPublicQueryDto } from './dto/blog-public-query.dto';

@Controller('/public/blogs')
export class BlogPublicController {
  constructor(private readonly blogPublicService: BlogPublicService) {}

  @Get()
  findAll(@Query() query: BlogPublicQueryDto) {
    return this.blogPublicService.findAll(query);
  }
}
