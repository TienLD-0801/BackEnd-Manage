import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage } from '../../global/globalEnum';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../modules/products/dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateProductResponse,
  ProductResponse,
} from '../../shared/types/response.type';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('api/products')
  @HttpCode(HttpStatus.OK)
  getAllProduct(): Promise<ProductResponse> {
    return this.productService.getAllProduct();
  }

  @Post('api/product-create')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) productDto: ProductDto,
  ): Promise<CreateProductResponse> {
    return this.productService.createProduct(productDto, file);
  }

  @Put('api/product-update/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: number,
    @Body() updatedProduct: Partial<Product>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    // try {
    //   let data = null;
    //   const product = await this.productService.getProductId(id);
    //   if (product.urlImg !== file.originalname) {
    //     // const url = await this.imgService.uploadImage(file);
    //     const url = '';
    //     data = { ...updatedProduct, urlImg: url };
    //   } else {
    //     data = { ...updatedProduct };
    //   }
    //   const updatedProductEntity = await this.productService.updateProduct(
    //     id,
    //     data,
    //   );
    //   return new ResponseData<Product>(
    //     updatedProductEntity,
    //     HttpStatus.OK,
    //     HttpMessage.SUCCESS,
    //   );
    // } catch (error) {
    //   return new ResponseData<Product>(null, HttpStatus.OK, HttpMessage.ERROR);
    // }
  }

  @Delete('api/product-delete/:id')
  @HttpCode(HttpStatus.OK)
  async DeleteProduct(@Param('id') id: number): Promise<ResponseData<Product>> {
    try {
      await this.productService.deleteProduct(id);
      return new ResponseData<Product>(
        null,
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
