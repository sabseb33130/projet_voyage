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

  @Column({ type: 'varchar', length: 50 })
  nom_album: string;
  @Column({ type: 'date', nullable: true })
  date_debut: string;
  @Column({ type: 'varchar', nullable: true })
  date_fin: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @ManyToMany(() => Photo, (photo) => photo.albums, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  photos: Photo[];

  @ManyToMany(() => User, (user) => user.albums)
  user: User[];
}
