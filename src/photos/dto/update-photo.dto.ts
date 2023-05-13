import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
