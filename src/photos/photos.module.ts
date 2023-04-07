import { Module } from '@nestjs/common';
import PhotosService from './photos.service';
import PhotosController from './photos.controller';
import UsersService from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, UsersService, AlbumsService],
})
export class PhotosModule {}
