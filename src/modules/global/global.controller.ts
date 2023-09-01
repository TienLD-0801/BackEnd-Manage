import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller()
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('/')
  async healthCheck() {
    return this.globalService.healthCheck();
  }
}
