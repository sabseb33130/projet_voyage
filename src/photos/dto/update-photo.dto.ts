import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsString()
  information: string;
  @ApiProperty()
  @IsOptional()
  mimeType: string;
}
