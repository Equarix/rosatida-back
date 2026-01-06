import { Request } from 'express';
import { RoleEnum } from '../enum/Role.enum';

export interface JwtPayload {
  userId: string;
  role: RoleEnum;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
