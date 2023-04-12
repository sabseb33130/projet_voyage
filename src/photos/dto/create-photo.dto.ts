import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreatePhotoDto {
  /*  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  file: string; */

  /*  @ApiProperty()
  @IsString()
  information: string;
 */
  @IsOptional()
  mimeType: string;
  @ApiProperty()
  @IsNotEmpty()
  albumId: number;
}
