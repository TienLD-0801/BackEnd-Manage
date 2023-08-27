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
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage } from '../../global/globalEnum';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../modules/products/dto/product.dto';
import { AuthMiddleware } from '../../shared/middlewares/auth.midleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image-upload.service';
@UseGuards(AuthMiddleware)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imgService: ImageService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<ResponseData<Product>> {
    try {
      return new ResponseData<Product>(
        await this.productService.getAllProduct(),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(error, HttpStatus.OK, HttpMessage.ERROR);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async GetProductById(
    @Param('id') id: number,
  ): Promise<ResponseData<Product>> {
    try {
      return new ResponseData<Product>(
        await this.productService.getProductId(id),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.OK, HttpMessage.ERROR);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) productDto: ProductDto,
  ): Promise<ResponseData<Product>> {
    try {
      if (!file) {
        throw new NotFoundException(`Invalid Image`);
      }
      if (file) {
        const url = await this.imgService.uploadImage(file);
        const dataCopy = {
          ...productDto,
          urlImg: url,
          nameImg: file.originalname,
        };
        return new ResponseData<Product>(
          await this.productService.createProduct(dataCopy),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        );
      }
    } catch (error) {
      return new ResponseData<Product>(error, HttpStatus.OK, HttpMessage.ERROR);
    }
  }

  @Delete('delete/:id')
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

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') id: number,
    @Body() updatedProduct: Partial<Product>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<Product>> {
    try {
      let data = null;
      const product = await this.productService.getProductId(id);

      if (product.nameImg !== file.originalname) {
        const url = await this.imgService.uploadImage(file);

        data = { ...updatedProduct, urlImg: url, nameImg: file.originalname };
      } else {
        data = { ...updatedProduct };
      }
      const updatedProductEntity = await this.productService.updateProduct(
        id,
        data,
      );
      return new ResponseData<Product>(
        updatedProductEntity,
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.OK, HttpMessage.ERROR);
    }
  }
}
