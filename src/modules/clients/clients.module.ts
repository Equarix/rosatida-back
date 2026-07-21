import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { AutoIncrementID } from '@typegoose/auto-increment';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Client.name,
        useFactory: () => {
          const schema = ClientSchema;
          schema.plugin(AutoIncrementID, {
            field: 'clientId',
            startAt: 1,
            incrementBy: 1,
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
