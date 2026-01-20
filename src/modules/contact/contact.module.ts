import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './entities/contact.entity';
import { AutoIncrementID } from '@typegoose/auto-increment';

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
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
