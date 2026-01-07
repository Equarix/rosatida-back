import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'categories',
})
export class Category {
  @Prop()
  categoryId: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  slug: string;

  @Prop({
    default: true,
  })
  status: boolean;

  @Prop()
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
