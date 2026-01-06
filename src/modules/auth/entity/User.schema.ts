import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from '../../../common/enum/Role.enum';
@Schema({
  collection: 'users',
})
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
