import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
