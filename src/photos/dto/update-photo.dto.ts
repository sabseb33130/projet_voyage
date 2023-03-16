import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom_photo?: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lat?: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lon?: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  date?: Date;
}
