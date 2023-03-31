import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
