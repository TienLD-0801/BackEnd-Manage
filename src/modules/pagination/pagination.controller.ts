import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Controller()
export class PaginationController {
  constructor(private readonly paginationService: PaginationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  paginationCustom<T>(
    repository: Repository<T>,
    options: PaginationDto,
  ): Promise<Pagination<T, IPaginationMeta>> {
    return this.paginationService.paginationCustom<T>(repository, options);
  }
}
