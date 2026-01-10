import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class QuoteComponent {
  @Prop()
  quoteText: string;

  @Prop()
  userImage: string;

  @Prop()
  userName: string;

  @Prop()
  userPosition: string;
}
