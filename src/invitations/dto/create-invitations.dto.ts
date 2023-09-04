import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateInvitationsDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  user_email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom_invite: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id_invitation: string;
}
