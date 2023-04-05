import User from 'src/users/entities/user.entity';
import Photo from 'src/photos/entities/photo.entity';
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
export default class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nom_album: string;
  /*   @ManyToMany(() => Photo)
  @JoinTable()
  Photo: Photo[]; */
}
