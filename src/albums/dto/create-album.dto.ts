import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_album: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date_debut: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date_fin: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
