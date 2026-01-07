import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ImagesModule } from './modules/images/images.module';
import { CategoryPublicModule } from './public/category-public/category-public.module';
import { BlogModule } from './modules/blog/blog.module';
import { BlogPublicModule } from './public/blog-public/blog-public.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    CategoriesModule,
    ImagesModule,
    CategoryPublicModule,
    BlogModule,
    BlogPublicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
