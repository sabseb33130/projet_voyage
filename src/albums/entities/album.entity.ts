import User from 'src/users/entities/user.entity';
import Photo from 'src/photos/entities/photo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nom_album: string;
  @Column({ type: 'date' })
  date: string;
  @ManyToMany(() => Photo, (photo) => photo.albums, {
    eager: true,
  })
  @JoinTable()
  photos: Photo[];

  @ManyToMany(() => User, (user) => user.albums)
  user: User[];
}
