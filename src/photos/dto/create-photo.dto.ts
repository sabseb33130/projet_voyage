import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_photo: string;
  @ApiProperty()
  @IsNumber()
  lat: number;
  @ApiProperty()
  @IsNumber()
  lon: number;
  @ApiProperty()
  @IsDate()
  date: Date;
}
