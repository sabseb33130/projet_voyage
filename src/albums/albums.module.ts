import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PhotosService } from 'src/photos/photos.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, PhotosService, UsersService],
})
export class AlbumsModule {}
