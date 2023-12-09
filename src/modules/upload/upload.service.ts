import { Injectable, Logger } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService implements MulterOptionsFactory {
  private readonly storage: CloudinaryStorage;

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.storage,
    };
  }

  async uploadImage(
    fileImage: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    Logger.log('Upload file cloudinary');
    const result = await cloudinary.uploader.upload(fileImage.path);
    return result;
  }

  async deleteImage(imageId: string) {
    Logger.log('Delete file cloudinary');
    await cloudinary.uploader.destroy(imageId);
  }
}
