import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class CarrouselComponent {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  subtitle: string;

  @Prop({
    type: [String],
  })
  urls: string[];
}
