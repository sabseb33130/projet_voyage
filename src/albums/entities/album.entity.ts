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

@Entity()
export default class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nom_album: string;
  @ManyToMany(() => Photo, (photo) => photo.albums, {
    eager: true,
  })
  @JoinTable()
  photos: Photo[];
  @ManyToMany(() => User, (user) => user.albums)
  user: User[];
}
