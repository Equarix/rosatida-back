import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryProvider } from '../../common/cloudinary/cloudinary.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './entities/image.entity';
import { AutoIncrementID } from '@typegoose/auto-increment';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Image.name,
        useFactory: () => {
          const schema = ImageSchema;
          schema.plugin(AutoIncrementID, {
            field: 'imageId',
            startAt: 1,
            incrementBy: 1,
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryProvider],
})
export class ImagesModule {}
