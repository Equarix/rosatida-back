import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
  @Prop()
  contactId: number;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  assunto: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: true,
  })
  status: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
