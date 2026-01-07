import { Controller, Get } from '@nestjs/common';
import { BlogPublicService } from './blog-public.service';

@Controller('/public/blogs')
export class BlogPublicController {
  constructor(private readonly blogPublicService: BlogPublicService) {}

  @Get()
  findAll() {
    return this.blogPublicService.findAll();
  }
}
