import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsPostalCode } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pseudo: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adresse_line1: string;
  @ApiProperty()
  @IsString()
  adresse_line2: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ville: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pays: string;

  @ApiProperty()
  @IsPostalCode('any')
  @IsNotEmpty()
  codepostal: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  departement: string;
}
