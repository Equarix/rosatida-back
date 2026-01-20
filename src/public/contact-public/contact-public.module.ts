import { Module } from '@nestjs/common';
import { ContactPublicService } from './contact-public.service';
import { ContactPublicController } from './contact-public.controller';
import {
  Contact,
  ContactSchema,
} from '../../modules/contact/entities/contact.entity';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Contact.name,
        useFactory: () => {
          const schema = ContactSchema;
          schema.plugin(AutoIncrementID, {
            field: 'contactId',
            startAt: 1,
            incrementBy: 1,
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ContactPublicController],
  providers: [ContactPublicService],
})
export class ContactPublicModule {}
