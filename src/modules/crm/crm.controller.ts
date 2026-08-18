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
  ParseFilePipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrmService } from './crm.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { QueryEnterpriseDto } from './dto/query-enterprise.dto';
import { Auth } from 'src/common/decorator/auth/auth.decorator';
import { CsvValidator } from './validators/csv.validator';

@Auth()
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.crmService.create(createEnterpriseDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryEnterpriseDto) {
    return this.crmService.findAll(queryDto);
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
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new CsvValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body('idCategoria', new ParseIntPipe()) idCategoria: number,
  ) {
    return this.crmService.handleFileUpload(file, idCategoria);
  }

  @Post('tracking')
  createTracking(@Body() createTrackingDto: CreateTrackingDto) {
    return this.crmService.createTracking(createTrackingDto);
  }

  @Patch('tracking/:id')
  updateTracking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrackingDto: UpdateTrackingDto,
  ) {
    return this.crmService.updateTracking(id, updateTrackingDto);
  }

  @Delete('tracking/:id')
  removeTracking(@Param('id', ParseIntPipe) id: number) {
    return this.crmService.removeTracking(id);
  }
}
