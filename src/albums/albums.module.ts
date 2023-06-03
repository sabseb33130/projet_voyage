import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { UsersService } from 'src/users/users.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService, PhotosService],
})
export class AlbumsModule {}
