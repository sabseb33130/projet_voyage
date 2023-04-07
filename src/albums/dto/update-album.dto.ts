import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nom_album?: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  photoId: number;
}
