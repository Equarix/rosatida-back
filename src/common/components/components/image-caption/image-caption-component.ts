import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class ImagesCaption {
  @Prop()
  url: string;

  @Prop()
  caption: string;

  @Prop()
  icon: string;
}

@Schema({
  _id: false,
})
export class ImageCaptionComponent {
  @Prop()
  subHeading: string;

  @Prop()
  header: string;

  @Prop()
  description: string;

  @Prop({
    type: [ImagesCaption],
  })
  images: ImagesCaption[];
}
