import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '../../config/cloudinary/cloudinary.config';
import { UploadService } from '././upload.service';

@Module({
  providers: [CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
