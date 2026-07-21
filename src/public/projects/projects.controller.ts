import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { BlogPublicQueryDto } from '../blog-public/dto/blog-public-query.dto';

@Controller('public/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Query() query: BlogPublicQueryDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findOne(slug);
  }

  @Get('home/featured')
  findAllFeatured() {
    return this.projectsService.findAllFeatured();
  }
}
