import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
