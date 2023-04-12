import { Module } from '@nestjs/common';
import PhotosService from './photos.service';
import PhotosController from './photos.controller';
import UsersService from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService, UsersService, AlbumsService],
})
export class PhotosModule {}
