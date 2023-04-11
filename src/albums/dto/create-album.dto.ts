import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_album: string;
  @ApiProperty()
  @IsNotEmpty()
  userId: number;
}
