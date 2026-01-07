import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ImagesModule } from './modules/images/images.module';
import { CategoryPublicModule } from './public/category-public/category-public.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    AuthModule,
    CategoriesModule,
    ProjectsModule,
    ImagesModule,
    CategoryPublicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
