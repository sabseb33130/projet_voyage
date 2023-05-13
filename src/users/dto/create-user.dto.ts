import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPostalCode,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

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
  @MinLength(6, { message: 'veuiller saisir six caracteres minimum' })
  pseudo: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+-=|]).{8,32}$/,
    { message: 'Le password ne correspond pas aux prérequis.' },
  )
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adresse_line1: string;
  @ApiProperty()
  @IsOptional()
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
  @IsPostalCode('FR')
  @IsNotEmpty()
  codepostal: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  departement: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  photo1: string;
}
