import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;
}
