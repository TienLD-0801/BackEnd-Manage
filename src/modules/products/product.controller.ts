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
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../modules/products/dto/product.dto';
import {
  CreateProductResponse,
  DeleteProduct,
  ProductResponse,
} from '../../shared/types/response.type';
import { diskStorage } from 'multer';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('api/products')
  @HttpCode(HttpStatus.OK)
  getAllProduct(): Promise<ProductResponse> {
    return this.productService.getAllProduct();
  }

  @Post('api/create-product')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('fileImage', {
      storage: diskStorage({
        destination: './image',
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
    @Body(new ValidationPipe()) params: ProductDto,
  ): Promise<CreateProductResponse> {
    return this.productService.createProduct(params, fileImage);
  }

  @Put('api/update-product/:id')
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id') id: number,
    @Body() updatedProduct: Partial<Product>,
  ): Promise<any> {
    return this.productService.updateProduct(id, updatedProduct);
  }

  @Delete('api/delete-product/:id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id') id: number): Promise<DeleteProduct> {
    return this.productService.deleteProduct(id);
  }
}
