import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateFriendDto } from './create-friend.dto';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  @ApiProperty()
  @IsOptional()
  invitation?: string;
  @ApiProperty()
  @IsOptional()
  invitation_ok?: string;
  @ApiProperty()
  @IsOptional()
  role: number;
}
