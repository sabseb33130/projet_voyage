import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsBoolean()
  isFriends: boolean;
}
