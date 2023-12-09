import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';

@ApiTags(API_TAG.global)
@Controller()
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('/')
  async healthCheck() {
    return this.globalService.healthCheck();
  }
}
