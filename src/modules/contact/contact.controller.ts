import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Auth } from 'src/common/decorator/auth/auth.decorator';

@Auth()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
