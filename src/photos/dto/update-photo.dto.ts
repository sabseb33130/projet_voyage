import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsString()
  information: string;

  @IsOptional()
  mimeType: string;
}
