import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from '../../../common/enum/Role.enum';
@Schema({
  collection: 'users',
})
export class User {
  @Prop()
  userId: number;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    type: 'string',
    enum: RoleEnum,
  })
  role: RoleEnum;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
