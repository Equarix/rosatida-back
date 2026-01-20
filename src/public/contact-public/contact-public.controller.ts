import { Controller, Post, Body } from '@nestjs/common';
import { ContactPublicService } from './contact-public.service';
import { CreateContactDto } from '../../modules/contact/dto/create-contact.dto';

@Controller('/public/contact')
export class ContactPublicController {
  constructor(private readonly contactPublicService: ContactPublicService) {}

  @Post()
  create(@Body() createContactPublicDto: CreateContactDto) {
    return this.contactPublicService.create(createContactPublicDto);
  }
}
