import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPostalCode,
  IsOptional,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  prenom: string;

  @ApiProperty()
  @IsString()
  nom: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pseudo: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  addresse: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsOptional()
  @IsPostalCode('any')
  codepostal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  departement: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  pays: string;
}
