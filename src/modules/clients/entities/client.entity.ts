import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Client {
  @Prop()
  clientId: number;

  @Prop()
  name: string;

  @Prop()
  url: string;

  @Prop()
  isActive: boolean;

  @Prop()
  feature: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
