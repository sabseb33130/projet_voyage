import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, PhotosService],
})
export class AlbumsModule {}
