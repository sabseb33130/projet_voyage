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
  addresse_line1: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  adresse_line2: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsOptional()
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
