import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  public healthCheck() {
    return {
      server: 'ok',
    };
  }
}
