import _ from 'lodash';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { UploadService } from '../upload/upload.service';
import { ProductEntity } from '../../entities/product.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { CategoriesEntity } from '../../entities/categories.entity';
import { PaginationService } from '../pagination/pagination.service';
import { PaginatedProductResponse } from '../../shared/types/product';
import {
  CreateProductResponse,
  DeleteProduct,
} from '../../shared/types/response.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    private uploadService: UploadService,
    private readonly paginationService: PaginationService,
  ) {}

  // get all product
  async getAllProduct(
    params: PaginationDto,
  ): Promise<PaginatedProductResponse> {
    const categories = await this.categoriesRepository.find();

    const product = await this.paginationService.paginationCustom(
      this.productRepository,
      params,
    );

    const productWithCategory = _.map(product.items, (product) => {
      const category = _.find(categories, { id: product.categoryId });
      return {
        id: product.id,
        productName: product.productName,
        categoryName: category ? category.categoryName : null,
        categoryId: product.category,
        url_id: product.url_id,
        url: product.url,
        description: product.description,
        price: product.price,
        created_at: product.created_at,
        updated_at: product.updated_at,
      };
    });

    const { nextPage, previousPage } =
      this.paginationService.calculatePagination(
        product.meta.currentPage,
        product.meta.totalPages,
      );

    return {
      result: {
        items: productWithCategory,
        meta: {
          ...product.meta,
          nextPage: nextPage,
          previousPage: previousPage,
        },
        links: product.links,
      },
    };
  }

  async createProduct(
    params: ProductDto,
    fileImage: Express.Multer.File,
  ): Promise<CreateProductResponse> {
    const { categoryName, productName } = params;

    const isProductName = await this.productRepository.findOne({
      where: { productName },
    });
    const category = await this.categoriesRepository.findOneBy({
      categoryName: categoryName,
    });

    if (!category) {
      throw new BadRequestException(
        `No category found with ID ${categoryName}`,
      );
    }

    if (isProductName) {
      throw new BadRequestException(` ${productName} already exists!`);
    }

    const imageResult = await this.uploadService.uploadImage(fileImage);

    const dataProduct = {
      ...params,
      categoryId: category.id,
      url_id: imageResult.public_id,
      url: imageResult.url,
    };

    await this.productRepository.save(dataProduct);

    return { message: 'Create product successfully' };
  }

  async deleteProduct(productId: number): Promise<DeleteProduct> {
    const product = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!product) {
      throw new BadRequestException(`No products found with ID ${productId}`);
    }
    await this.uploadService.deleteImage(product.url_id);
    await this.productRepository.delete(productId);

    return {
      message: `Delete product with Name ${product.productName} successfully`,
    };
  }

  async updateProduct(id: number, params: ProductDto): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    console.log('====================================');
    console.log('prams', params);
    console.log('====================================');
    //   const updatedProductEntity = await this.productRepository.save({
    //     ...product,
    //     ...updatedProduct,
    //   });

    //   return updatedProductEntity;
  }
}
