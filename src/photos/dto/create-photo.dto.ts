import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: string;
}
