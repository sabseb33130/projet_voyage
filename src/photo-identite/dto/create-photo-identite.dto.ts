import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreatePhotoIdentiteDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  file: string;
}
