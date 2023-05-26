import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  descriptions: { description: string }[];
}
