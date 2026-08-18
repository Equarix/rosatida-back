import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrmService } from './crm.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Auth } from 'src/common/decorator/auth/auth.decorator';

@Auth()
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.crmService.create(createEnterpriseDto);
  }

  @Get()
  findAll() {
    return this.crmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.crmService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.crmService.handleFileUpload(file);
  }
}
