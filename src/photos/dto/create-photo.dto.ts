import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  @ApiProperty()
  @Optional()
  description: string;
}
