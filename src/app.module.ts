import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ImagesModule } from './modules/images/images.module';
import { CategoryPublicModule } from './public/category-public/category-public.module';
import { BlogModule } from './modules/blog/blog.module';
import { BlogPublicModule } from './public/blog-public/blog-public.module';
import { CategoriesProjectModule } from './modules/categories-project/categories-project.module';
import { ContactModule } from './modules/contact/contact.module';
import { ContactPublicModule } from './public/contact-public/contact-public.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { CategoryProjectsModule } from './public/category-projects/category-projects.module';
import { ProjectsModule as PublicProjectsModule } from './public/projects/projects.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ClientsPublicModule } from './public/clients-public/clients-public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmModule } from './modules/crm/crm.module';
import { CrmCategoriesModule } from './modules/crm-categories/crm-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'default',
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<number>('DB_PORT', 1433)),
        username: configService.get<string>('DB_USER', 'sa'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'master'),
        entities: [__dirname + '/**/*.entityp{.ts,.js}'],
      }),
    }),
    AuthModule,
    CategoriesModule,
    ImagesModule,
    CategoryPublicModule,
    BlogModule,
    BlogPublicModule,
    CategoriesProjectModule,
    ContactModule,
    ContactPublicModule,
    ProjectsModule,
    PublicProjectsModule,
    CategoryProjectsModule,
    ClientsModule,
    ClientsPublicModule,
    CrmModule,
    CrmCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
