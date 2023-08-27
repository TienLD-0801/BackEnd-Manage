import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';

@Injectable()
export class ImageService implements MulterOptionsFactory {
  private readonly storage: CloudinaryStorage;

  constructor() {
    this.storage = new CloudinaryStorage({
      cloudinary,
      params: {
        public_id: (req, file) => uuidv4(), // Generate a unique filename for each uploaded image
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.storage,
    };
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Xử lý tệp hình ảnh tại đây
    // Ví dụ: tải lên hình ảnh lên Cloudinary và trả về URL công khai của hình ảnh đã tải lên

    const result = await cloudinary.uploader.upload(file.path);
    const publicUrl = result.secure_url;

    // Xóa tệp tạm sau khi tải lên thành công
    // fs.unlinkSync(file.path);

    return publicUrl;
  }
}
