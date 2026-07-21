import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ContactStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

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

  @Prop({
    enum: ContactStatus,
    default: ContactStatus.PENDING,
  })
  contactStatus: ContactStatus;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
