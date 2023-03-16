import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  nom_album: string;
  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
  @ManyToMany(() => Photo)
  @JoinTable()
  photo: Photo[];
}
