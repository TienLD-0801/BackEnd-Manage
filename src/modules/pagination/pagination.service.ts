import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {
  constructor() {}

  async paginationCustom<T>(
    repository: Repository<T>,
    options: PaginationDto,
  ): Promise<Pagination<T, IPaginationMeta>> {
    return paginate(repository, options);
  }

  calculatePagination(
    currentPage: number,
    totalPages: number,
  ): { nextPage: number | null; previousPage: number | null } {
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    return { nextPage, previousPage };
  }
}
