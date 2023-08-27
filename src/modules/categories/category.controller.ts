import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  Put,
  ValidationPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage } from '../../global/globalEnum';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from '.../../models/category.model';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Res() res: Response): Promise<any> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.findAll(),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.OK, HttpMessage.ERROR));
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async detail(@Param('id') id: number, @Res() res: Response): Promise<any> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.findById(id),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.OK, HttpMessage.ERROR));
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body(new ValidationPipe()) category: CategoryDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.create(category),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.OK, HttpMessage.ERROR));
    }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) category: CategoryDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.update(id, category),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.OK, HttpMessage.ERROR));
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number, @Res() res: Response): Promise<any> {
    try {
      const isFlag: boolean = await this.categoryService.delete(id);
      if (isFlag) {
        return res.json(
          new ResponseData(isFlag, HttpStatus.OK, HttpMessage.SUCCESS),
        );
      } else {
        return res.json(
          new ResponseData(isFlag, HttpStatus.OK, HttpMessage.ERROR),
        );
      }
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.OK, HttpMessage.ERROR));
    }
  }
}
