import { Module } from '@nestjs/common';
import { PhotoIdentiteService } from './photo-identite.service';
import { PhotoIdentiteController } from './photo-identite.controller';

@Module({
  controllers: [PhotoIdentiteController],
  providers: [PhotoIdentiteService]
})
export class PhotoIdentiteModule {}
