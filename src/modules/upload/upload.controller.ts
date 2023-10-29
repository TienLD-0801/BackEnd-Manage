import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  uploadImage(@Body() fileImage: Express.Multer.File) {
    return this.uploadService.uploadImage(fileImage);
  }
}
