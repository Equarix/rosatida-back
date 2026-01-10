import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { ImageType } from '../../components/image/imageType.enum';

export class ImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsEnum(ImageType)
  @IsNotEmpty()
  imageType: ImageType;
}
