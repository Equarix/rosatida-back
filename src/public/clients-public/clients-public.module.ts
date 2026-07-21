import { Module } from '@nestjs/common';
import { ClientsPublicService } from './clients-public.service';
import { ClientsPublicController } from './clients-public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Client,
  ClientSchema,
} from 'src/modules/clients/entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
  ],
  controllers: [ClientsPublicController],
  providers: [ClientsPublicService],
})
export class ClientsPublicModule {}
