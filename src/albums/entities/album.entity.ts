import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nom_album: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToMany(() => Photo)
  @JoinTable()
  photo: Photo[];
}
