import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Album } from 'src/albums/entities/album.entity';
import { Invitations } from 'src/invitations/entities/invitations.entity';
import { PhotoIdentite } from 'src/photo-identite/entities/photo-identite.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email', 'pseudo'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  nom: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  prenom: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  pseudo: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  photo_identite: string;
  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  photos: Photo[];
  @ManyToMany(() => Album, (album) => album.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  albums: Album[];

  @OneToMany(() => Invitations, (invitations) => invitations.user)
  invitations: Invitations[];
  @ManyToMany(() => User, (user) => user.friends)
  users: User[];
  @ManyToMany(() => User, (user) => user.users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  friends: User[];
  @OneToOne(() => PhotoIdentite, (photoIdentite) => photoIdentite.user)
  @JoinColumn()
  photoIdentites: PhotoIdentite;
}
