import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class DetailsComponent {
  @Prop()
  header: string;
  @Prop()
  content: string;
}
