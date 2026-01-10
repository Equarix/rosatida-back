import { Prop, Schema } from '@nestjs/mongoose';
import { ImageType } from './imageType.enum';

@Schema({
  _id: false,
})
export class ImageComponent {
  @Prop()
  url: string;

  @Prop({
    enum: ImageType,
    type: String,
  })
  imageType: ImageType;
}
