import { Request } from 'express';
import { RoleEnum } from '../enum/Role.enum';

export interface JwtPayload {
  userId: number;
  role: RoleEnum;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
