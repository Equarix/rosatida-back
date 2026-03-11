import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../../modules/auth/entity/User.schema';
import { CategoriesProyect } from '../../../modules/categories-project/entities/categories-project.entity';
import { Image } from '../../../modules/images/entities/image.entity';
import { Components } from '../../../common/components/components';

@Schema()
export class Project {
  @Prop()
  projectId: number;

  @Prop()
  projectName: string;

  @Prop()
  projectSlug: string;

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
    ref: CategoriesProyect.name,
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

  @Prop({
    type: Array,
    default: [],
  })
  components: Components[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
