import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';
import {
  DeleteUser,
  LoginResponse,
  CreateUserResponse,
  UpdateUser,
  PaginatedUserResponse,
} from '../../shared/types/response.type';
import {
  RegisterGuard,
  LoginGuard,
  UserGuard,
} from '../../shared/guards/auth.guard';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';
import { PaginationDto } from '../pagination/dto/pagination.dto';

@ApiTags(API_TAG.user)
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('api/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LoginGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  login(
    @Body() params: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    return this.userService.login(params, response);
  }

  @Get('api/users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthMiddleware, UserGuard)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeader({
    name: 'x-api-token',
    required: true,
  })
  getAllUsers(@Query() params: PaginationDto): Promise<PaginatedUserResponse> {
    return this.userService.getAllUsers(params);
  }

  @Post('api/create-user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RegisterGuard)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createUser(@Body() params: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.createUser(params);
  }

  @Post('api/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.userService.logout(response);
  }

  @Put('api/update-user/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthMiddleware)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateUser(
    @Param('id') id: number,
    @Body() params: UserDto,
  ): Promise<UpdateUser> {
    return this.userService.updateUser(id, params);
  }

  @Delete('api/delete-user/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthMiddleware)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteUser(@Param('id') id: number): Promise<DeleteUser> {
    return this.userService.deleteUser(id);
  }
}
