import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'categories_project',
})
export class CategoriesProyect {
  @Prop()
  category_proyectId: number;

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

export const CategoriesProyectSchema =
  SchemaFactory.createForClass(CategoriesProyect);
