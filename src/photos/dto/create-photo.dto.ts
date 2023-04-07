import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsDateString,
} from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_photo: string;
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  /* @ApiProperty()
  @IsNumber()
  lat: number;
  @ApiProperty()
  @IsNumber()
  lon: number; */
  /*   @ApiProperty()
  @IsDateString()
  date_photo: string; */
}
