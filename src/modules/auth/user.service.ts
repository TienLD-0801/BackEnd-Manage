import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../../entities/user.entity';
import { JWT, ROLE } from '../../shared/constants/constants';
import {
  DeleteUser,
  LoginResponse,
  LogoutResponse,
  CreateUserResponse,
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
  // check duplicate create and update
  async checkDuplicate(params: UserDto, id?: number) {
    const { email, card_id, phone } = params;
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    let duplicateUser = null;

    if (id) {
      duplicateUser = await queryBuilder
        .where('user.id != :id', { id })
        .andWhere(
          '(user.email = :email OR user.card_id = :card_id OR user.phone = :phone)',
          { email, card_id, phone },
        )
        .getOne();
    } else {
      duplicateUser = await queryBuilder
        .where(
          '(user.email = :email OR user.card_id = :card_id OR user.phone = :phone)',
          { email, card_id, phone },
        )
        .getOne();
    }

    if (duplicateUser) {
      let duplicateField = '';
      if (duplicateUser.email === email) {
        duplicateField = 'Email';
      } else if (duplicateUser.card_id === card_id) {
        duplicateField = 'Card ID';
      } else if (duplicateUser.phone === phone) {
        duplicateField = 'Phone';
      }

      throw new BadRequestException(`${duplicateField} already exists!`);
    }
  }

  // create user
  async createUser(params: CreateUserDto): Promise<CreateUserResponse> {
    const { name, email, password, age, card_id, phone, role } = params;
    const hashedPassword = await bcrypt.hash(password, 12);

    // check duplicate field
    await this.checkDuplicate(params);

    const data = {
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
      card_id: card_id,
      phone: phone,
      role: role !== undefined ? role : 1,
    };

    const saveData = await this.userRepository.save(data);

    return {
      userInfo: {
        name: saveData.name,
        email: saveData.email,
        age: saveData.age,
        card_id: saveData.card_id,
        phone: saveData.phone,
        role: role !== undefined ? role : 1,
      },
      message: `User ${saveData.name} register successfully`,
    };
  }

  // login user
  async login(params: LoginDto, response: Response): Promise<LoginResponse> {
    const { email, password } = params;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    const jwt = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: 'secret',
        expiresIn: '1d',
      },
    );

    const refreshJwt = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: 'secret',
        expiresIn: '7s',
      },
    );

    response.cookie(JWT, jwt, { httpOnly: true });

    return {
      userInfo: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwt,
      refreshToken: refreshJwt,
    };
  }

  // get all users
  async getUsers(): Promise<UserResponse> {
    const users = await this.userRepository.find();

    const userResponses = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        card_id: user.card_id,
        phone: user.phone,
        role: user.role,
        create_ad: user.created_at,
        updated_at: user.updated_at,
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

  // update user
  async updateUser(id: number, params: UserDto): Promise<UpdateUser> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new BadRequestException(`Can't find user with id : ${id}`);
    }

    // check duplicate field
    await this.checkDuplicate(params, id);

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
      age: params.age,
      card_id: params.card_id,
      phone: params.phone,
      role: params.role,
    };

    return { result: newUser, message: 'Update successfully' };
  }

  // delete user
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
