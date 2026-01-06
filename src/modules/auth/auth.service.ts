import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entity/User.schema';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 401);
    }

    const jwtPayload = {
      userId: user._id.toString(),
      role: user.role,
    };

    const token = this.jwtService.sign(jwtPayload);

    return {
      data: user,
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password, role } = registerDto;

    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new HttpException('Username already exists', 400);
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return {
      ...newUser.toObject(),
    };
  }
}
