import { PartialType } from '@nestjs/swagger';
import { CreatePhotoIdentiteDto } from './create-photo-identite.dto';

export class UpdatePhotoIdentiteDto extends PartialType(CreatePhotoIdentiteDto) {}
