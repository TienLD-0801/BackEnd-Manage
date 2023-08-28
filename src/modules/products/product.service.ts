import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Product } from '../../models/product.model';
import { Repository } from 'typeorm';
import {
  CreateProductResponse,
  ProductResponse,
} from 'shared/types/response.type';
import { ProductDto } from './dto/product.dto';
import { ImageService } from './image-upload.service';

import _ from 'lodash';
// import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly imgService: ImageService,
  ) {}

  // get all product
  async getAllProduct(): Promise<ProductResponse> {
    const products = await this.productRepository.find();

    const categoryIds = _.map(products, 'id');
    console.log('id la gi ', categoryIds);

    // const categories = await this.categoriesRepository.findOne({
    //   where: categoryIds,
    // });
    // const categoryMap = _.keyBy(categories, 'id');

    // const productsWithCategories = _.map(products, (product) => ({
    //   ...product,
    //   categoryName: _.get(
    //     categoryMap,
    //     [product.categoryId, 'categoryName'],
    //     null,
    //   ),
    // }));

    return { result: [] };
  }

  async createProduct(
    productDto: ProductDto,
    file: Express.Multer.File,
  ): Promise<CreateProductResponse> {
    // if (!file) {
    //   throw new BadRequestException(`${file} could not be found`);
    // }

    // const url = await cloudinary.uploader.upload(file.path);

    // data product
    const dataProduct = {
      ...productDto,
    };

    await this.productRepository.save(dataProduct);

    return { message: 'Create product successfully' };
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });
    if (!product) {
      throw new NotFoundException(
        `Không tìm thấy sản phẩm với ID ${productId}`,
      );
    }
    await this.productRepository.delete(productId);
  }

  async updateProduct(
    productId: number,
    updatedProduct: Partial<Product>,
  ): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(
        `Không tìm thấy sản phẩm với ID ${productId}`,
      );
    }

    //   const updatedProductEntity = await this.productRepository.save({
    //     ...product,
    //     ...updatedProduct,
    //   });

    //   return updatedProductEntity;
  }
}
