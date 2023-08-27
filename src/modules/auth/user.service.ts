import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../../entities/user.entity';
import { JWT, ROLE } from '../../shared/constants/constants';
import {
  DeleteUser,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  UpdateUser,
  UserResponse,
} from '../../shared/types/response.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(params: RegisterDto): Promise<RegisterResponse> {
    const { name, email, password } = params;
    const hashedPassword = await bcrypt.hash(password, 12);

    const checkEmail = await this.userRepository.findOne({
      where: { email: email },
    });

    if (checkEmail) {
      throw new BadRequestException(`Email already exists !`);
    }
    const data = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const saveData = await this.userRepository.save(data);

    return {
      userInfo: {
        name: saveData.name,
        email: saveData.email,
      },
      message: `${saveData.name} register successfully`,
    };
  }

  async login(params: LoginDto, response: Response): Promise<LoginResponse> {
    const { email, password } = params;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie(JWT, jwt, { httpOnly: true });

    return {
      userInfo: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwt,
    };
  }

  async getUsers(): Promise<UserResponse> {
    const users = await this.userRepository.find();

    const userResponses = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });

    return { result: userResponses };
  }

  async logout(response: Response): Promise<LogoutResponse> {
    response.clearCookie(JWT);
    return {
      message: 'Logout successfully',
    };
  }

  async updateUser(id: number, params: UserDto): Promise<UpdateUser> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new BadRequestException(`Can't find user with id : ${id}`);
    }

    if (params.role) {
      if (params.role !== ROLE.Admin && params.role !== ROLE.Staff) {
        throw new BadRequestException('Role already exits !');
      }
    }

    await this.userRepository.save({
      ...user,
      ...params,
    });

    const newUser = {
      name: params.name,
      email: params.email,
      role: params.role,
    };

    return { result: newUser, message: 'Update successfully' };
  }

  async deleteUser(id: number): Promise<DeleteUser> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new BadRequestException(`Can't find user with id : ${id}`);
    }

    await this.userRepository.remove(user);

    return {
      message: `User ${user.name} delete successfully`,
    };
  }
}
