import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../../modules/contact/dto/create-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from '../../modules/contact/entities/contact.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContactPublicService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  create(createContactPublicDto: CreateContactDto) {
    return 'This action adds a new contactPublic';
  }
}
