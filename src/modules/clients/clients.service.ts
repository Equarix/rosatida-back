import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel({
      ...createClientDto,
      isActive: true,
    });
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(clientId: number): Promise<Client> {
    const client = await this.clientModel.findOne({ clientId }).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    return client;
  }

  async update(
    clientId: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const existingClient = await this.clientModel
      .findOneAndUpdate({ clientId }, updateClientDto, { new: true })
      .exec();

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    return existingClient;
  }

  async remove(clientId: number): Promise<Client> {
    const deletedClient = await this.clientModel
      .findOneAndDelete({ clientId })
      .exec();
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    return deletedClient;
  }
}
