import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/modules/auth/entity/User.schema';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Components } from './components/components';

@Schema()
export class Blog {
  @Prop()
  blogId: number;

  @Prop()
  blogName: string;

  @Prop()
  blogSlug: string;

  @Prop()
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  user: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Image.name,
  })
  image: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
  })
  category: Types.ObjectId;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: true,
  })
  status: boolean;

  @Prop()
  timeline: string;

  @Prop({
    type: Array,
    default: [],
  })
  components: Components[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
