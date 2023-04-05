import { Module } from '@nestjs/common';
import PhotosService from './photos.service';
import PhotosController from './photos.controller';
import UsersService from 'src/users/users.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, UsersService],
})
export class PhotosModule {}
