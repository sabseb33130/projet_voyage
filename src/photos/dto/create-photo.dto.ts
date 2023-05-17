import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
