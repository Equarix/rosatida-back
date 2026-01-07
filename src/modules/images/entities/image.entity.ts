import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'images',
})
export class Image {
  @Prop()
  imageId: number;

  @Prop()
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
