import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invitation: string;
  @ApiProperty()
  @IsString()
  invitation_ok: string;
  @ApiProperty()
  @IsNumber()
  Access_level: number;
}
