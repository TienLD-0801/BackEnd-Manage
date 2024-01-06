import { FileInterceptor } from '@nestjs/platform-express';
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from '../../modules/products/dto/product.dto';
import {
  CreateProductResponse,
  DeleteProduct,
} from '../../shared/types/response.type';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { PaginatedProductResponse } from '../../shared/types/product';
@ApiTags(API_TAG.product)
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('api/products')
  @HttpCode(HttpStatus.OK)
  getAllProduct(
    @Query() params: PaginationDto,
  ): Promise<PaginatedProductResponse> {
    return this.productService.getAllProduct(params);
  }

  @Post('api/create-product')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('fileImage', {
      storage: diskStorage({
        // destination: './image',
        filename: (_, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + Date.now() + '.' + fileExtension;
          cb(null, newFileName);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  createProduct(
    @UploadedFile() fileImage: Express.Multer.File,
    @Body() params: ProductDto,
  ): Promise<CreateProductResponse> {
    return this.productService.createProduct(params, fileImage);
  }

  @Put('api/update-product/:id')
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id') id: number,
    @Body() params: ProductDto,
  ): Promise<any> {
    return this.productService.updateProduct(id, params);
  }

  @Delete('api/delete-product/:id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id') id: number): Promise<DeleteProduct> {
    return this.productService.deleteProduct(id);
  }
}
