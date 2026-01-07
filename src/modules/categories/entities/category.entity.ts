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

  @Prop({
    default: true,
  })
  status: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
