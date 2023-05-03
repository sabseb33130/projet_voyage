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

  //test
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
  //

  @ManyToMany(() => Album, (album) => album.photos)
  albums: Album[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
