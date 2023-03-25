import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nom_album: string;

  @ManyToOne(() => User, (user) => user.album)
  @JoinColumn()
  user: User[];
  @ManyToMany(() => Photo, (photo) => photo.id)
  @JoinTable()
  photo: Photo[];
}
