import _ from 'lodash';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { ProductEntity } from '../../entities/product.entity';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { CategoriesEntity } from '../../entities/categories.entity';
import { PaginationService } from '../pagination/pagination.service';
import { PaginatedCategoryResponse } from '../..//shared/types/category';
import {
  CreateCategoryResponse,
  DeleteCategory,
  UpdateCategoryResponse,
} from '../../shared/types/response.type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllCategory(
    params: PaginationDto,
  ): Promise<PaginatedCategoryResponse> {
    const product = await this.productRepository.find();
    const categories = await this.paginationService.paginationCustom(
      this.categoryRepository,
      params,
    );

    const { nextPage, previousPage } =
      this.paginationService.calculatePagination(
        categories.meta.currentPage,
        categories.meta.totalPages,
      );

    const productWithCategory = _.groupBy(product, 'categoryId');

    const categoriesResponse = categories.items.map((category) => {
      return {
        id: category.id,
        categoryName: category.categoryName,
        isProductUse: !!productWithCategory[category.id],
        created_at: category.created_at,
        updated_at: category.updated_at,
      };
    });

    return {
      result: {
        items: categoriesResponse,
        meta: {
          ...categories.meta,
          nextPage: nextPage,
          previousPage: previousPage,
        },
        links: categories.links,
      },
    };
  }

  async createCategory(params: CategoryDto): Promise<CreateCategoryResponse> {
    const { categoryName } = params;

    const checkProductCategory = await this.categoryRepository.findOne({
      where: { categoryName: categoryName },
    });

    if (checkProductCategory) {
      throw new BadRequestException(`Product category already exists !`);
    }

    const dataCategory = {
      ...params,
    };

    const saveData = await this.categoryRepository.save(dataCategory);

    return {
      message: `Create ${saveData.categoryName} category successfully`,
    };
  }

  async updateCategory(
    id: number,
    params: CategoryDto,
  ): Promise<UpdateCategoryResponse> {
    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new BadRequestException(`Can't find category with id : ${id}`);
    }

    await this.categoryRepository.save({
      ...category,
      ...params,
    });

    return { message: 'Update successfully' };
  }

  async deleteCategory(categoriesId: number): Promise<DeleteCategory> {
    const category = await this.categoryRepository.findOneBy({
      id: categoriesId,
    });

    const productsWithCategory = await this.productRepository.find({
      where: {
        categoryId: categoriesId,
      },
    });

    if (!category) {
      throw new BadRequestException(
        `Can't find category with ID ${categoriesId}`,
      );
    }

    if (productsWithCategory.length > 0) {
      throw new BadRequestException(
        `Categories cannot be deleted when there are products in use`,
      );
    }

    await this.categoryRepository.remove(category);

    return {
      message: `Category ${category.categoryName} delete successfully`,
    };
  }
}
