import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';

@Module({
  providers: [PaginationService],
  controllers: [PaginationController],
  exports: [PaginationService],
})
export class PaginationModule {}
