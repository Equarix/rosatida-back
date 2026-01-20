import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { RegisterDto } from './dto/register.dto';
import { RoleEnum } from '../../common/enum/Role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth([RoleEnum.ADMIN])
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Auth([RoleEnum.ADMIN])
  @Get('all-users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Auth([RoleEnum.ADMIN])
  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Auth([RoleEnum.ADMIN, RoleEnum.USER])
  @Patch('edit/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<RegisterDto>,
  ) {
    return this.authService.updateUser(id, updateData);
  }
}
