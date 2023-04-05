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
  @Column({ type: 'varchar' })
  nom_photo: string;
  /* @Column({ type: 'numeric' })
   lat: number;
  @Column({ type: 'numeric' })
  lon: number; */
  /*   @Column({ type: 'date' })
  date_photo: string; */
  /* @ManyToMany(() => Album)
  album: Album[]; */
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
