import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';
import { PaginationService } from './pagination.service';

@ApiTags(API_TAG.pagination)
@Controller()
export class PaginationController {
  constructor(private readonly paginationService: PaginationService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  paginationCustom<T>(
    repository: Repository<T>,
    options: PaginationDto,
  ): Promise<Pagination<T, IPaginationMeta>> {
    return this.paginationService.paginationCustom<T>(repository, options);
  }
}
