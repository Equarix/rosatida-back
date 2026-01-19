import { DefaultSchemaOptions, Document, Types } from 'mongoose';
import { User } from '../../modules/auth/entity/User.schema';

export type UserModel = Document<unknown, {}, User, {}, DefaultSchemaOptions> &
  User & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  } & {
    id: string;
  };
