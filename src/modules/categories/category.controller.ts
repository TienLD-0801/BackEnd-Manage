import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  ValidationPipe,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import {
  CreateCategoryResponse,
  DeleteCategory,
} from '../../shared/types/response.type';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';
import { PaginatedCategoryResponse } from '../../shared/types/category';
import { PaginationDto } from '../pagination/dto/pagination.dto';

@ApiTags(API_TAG.categories)
@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('api/categories')
  @HttpCode(HttpStatus.OK)
  getAllCategory(
    @Query() params: PaginationDto,
  ): Promise<PaginatedCategoryResponse> {
    return this.categoryService.getAllCategory(params);
  }

  @Post('api/create-category')
  @HttpCode(HttpStatus.OK)
  createCategory(
    @Body(new ValidationPipe()) params: CategoryDto,
  ): Promise<CreateCategoryResponse> {
    return this.categoryService.createCategory(params);
  }

  @Put('api/update-category/:id')
  @HttpCode(HttpStatus.OK)
  updateCategory(
    @Param('id') id: number,
    @Body(new ValidationPipe()) params: CategoryDto,
  ): Promise<any> {
    return this.categoryService.updateCategory(id, params);
  }

  @Delete('api/delete-category/:id')
  @HttpCode(HttpStatus.OK)
  deleteCategory(@Param('id') categoryId: number): Promise<DeleteCategory> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
