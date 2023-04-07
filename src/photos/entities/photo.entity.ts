import { ApiProperty } from '@nestjs/swagger';

import Album from 'src/albums/entities/album.entity';
import User from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
@Entity()
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  nom_photo: string;

  @ManyToMany(() => Album, (album) => album.photos)
  albums: Album[];
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
