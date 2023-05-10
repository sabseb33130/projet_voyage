import { ApiProperty } from '@nestjs/swagger';

import Album from 'src/albums/entities/album.entity';
import User from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  originalName: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  file: string;
  @ApiProperty()
  @Column({ nullable: true })
  description: string;
  @ManyToMany(() => Album, (album) => album.photos, { onDelete: 'CASCADE' })
  albums: Album[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  user: User;
}
