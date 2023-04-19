import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class UpdatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;
}
