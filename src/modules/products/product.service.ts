import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from '../../models/product.model';
import { ProductEntity } from '../../entities/product.entity';
import { CategoriesEntity } from '../../entities/categories.entity';
import {
  CreateProductResponse,
  DeleteProduct,
  ProductResponse,
} from '../../shared/types/response.type';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    private uploadService: UploadService,
  ) {}

  // get all product
  async getAllProduct(): Promise<ProductResponse> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    const dataProduct = await queryBuilder
      .select([
        'product.id AS id',
        'product.productName AS productName',
        'categories.productCategoryName As categoryName',
        'product.description AS description',
        'product.url_id AS url_id',
        'product.url AS url',
        'product.price AS price',
        'product.created_at AS create_at',
        'product.updated_at AS update_at',
      ])
      .innerJoin(
        CategoriesEntity,
        'categories',
        'product.categoryid = categories.id',
      )
      .getRawMany();

    return { result: dataProduct };
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
      productCategoryName: categoryName,
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
