import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryResponse } from '../../common/cloudinary/cloudinary-response';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './entities/image.entity';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async create(file: Express.Multer.File) {
    try {
      const res = await new Promise<CloudinaryResponse>((res, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error || !result) {
              return reject(error);
            }
            res(result as CloudinaryResponse);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      const newImage = await this.imageModel.create({ url: res.secure_url });

      return newImage.save();
    } catch (error) {
      console.error(error);

      throw new HttpException(
        'Image upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.imageModel.find().exec();
  }
}
