import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';

@Injectable()
export class ClientsPublicService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async findAll() {
    return this.clientModel
      .find({
        isActive: true,
      })
      .exec();
  }
}
