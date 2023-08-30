import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../entities/categories.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import {
  CategoryResponse,
  CreateCategoryResponse,
} from '../../shared/types/response.type';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {}

  // async findById(id: number): Promise<Category> {
  //   return await this.categoryRepository.findOne({ where: { id } });
  // }

  // async create(category: Category): Promise<Category> {
  //   return await this.categoryRepository.save(category);
  // }

  // async update(id: number, category: Category): Promise<Category> {
  //   await this.categoryRepository.update(id, category);
  //   return this.findById(id);
  // }

  // async delete(id: number): Promise<boolean> {
  //   const isFlag: DeleteResult = await this.categoryRepository.delete(id);
  //   return isFlag.affected === 1;
  // }

  async getAllCategory(): Promise<CategoryResponse> {
    const categories = await this.categoryRepository.find();

    const categoriesResponse = categories.map((category) => {
      return {
        id: category.id,
        productCategory: category.productCategory,
      };
    });

    return { result: categoriesResponse };
  }

  async createCategory(params: CategoryDto): Promise<CreateCategoryResponse> {
    const { productCategory } = params;

    const checkProductCategory = await this.categoryRepository.findOne({
      where: { productCategory: productCategory },
    });

    if (checkProductCategory) {
      throw new BadRequestException(`Product category already exists !`);
    }

    const dataCategory = {
      ...params,
    };

    const saveData = await this.categoryRepository.save(dataCategory);

    return {
      message: `Create ${saveData.productCategory} category successfully`,
    };
  }

  async updateCategory(id: number, params: CategoryDto) {
    return;
  }

  async deleteCategory(id: number) {
    return;
  }
}
