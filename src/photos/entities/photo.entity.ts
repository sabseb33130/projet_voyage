import { Album } from 'src/albums/entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  nom_photo: string;
  @Column({ type: 'numeric' })
  lat: number;
  @Column({ type: 'numeric' })
  lon: number;
  @Column({ type: 'date' })
  date_photo: Date;

  @ManyToMany(() => Album)
  @JoinTable()
  album: Album[];

  @ManyToOne(() => User, (user) => user.photos, { eager: true })
  @JoinColumn()
  user: User;
}
