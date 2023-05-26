import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService],
})
export class AlbumsModule {}
