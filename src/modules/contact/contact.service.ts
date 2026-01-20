import { HttpException, Injectable } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './entities/contact.entity';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  findAll() {
    return this.contactModel.find().exec();
  }

  async findOne(id: number) {
    const contact = await this.contactModel.findOne({ contactId: id }).exec();
    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const findContact = await this.contactModel
      .findOne({ contactId: id })
      .exec();
    if (!findContact) {
      throw new HttpException('Contact not found', 404);
    }

    return this.contactModel
      .updateOne({ contactId: id }, updateContactDto)
      .exec();
  }

  async remove(id: number) {
    const findContact = await this.contactModel
      .findOne({ contactId: id })
      .exec();

    if (!findContact) {
      throw new HttpException('Contact not found', 404);
    }

    return this.contactModel
      .updateOne({ contactId: id }, { status: false })
      .exec();
  }
}
