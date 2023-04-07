import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
