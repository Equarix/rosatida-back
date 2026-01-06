import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '../../../common/enum/Role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}
