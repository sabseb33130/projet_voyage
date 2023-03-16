import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFriendDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invitation: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  invitation_ok: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: number;
}
