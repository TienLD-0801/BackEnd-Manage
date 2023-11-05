import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../entities/categories.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import {
  CategoryResponse,
  CreateCategoryResponse,
  DeleteCategory,
  UpdateCategoryResponse,
} from '../../shared/types/response.type';
import { ProductEntity } from '../../entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAllCategory(): Promise<CategoryResponse> {
    const categories = await this.categoryRepository.find();

    const categoriesResponse = categories.map((category) => {
      return {
        id: category.id,
        categoryName: category.categoryName,
        created_at: category.created_at,
        updated_at: category.updated_at,
      };
    });

    return { result: categoriesResponse };
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
