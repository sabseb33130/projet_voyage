import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import Album from 'src/albums/entities/album.entity';
import Invitations from 'src/invitations/entities/invitations.entity';
import { PhotoIdentite } from 'src/photo-identite/entities/photo-identite.entity';
import Photo from 'src/photos/entities/photo.entity';
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
export default class User extends BaseEntity {
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
  @Column({ type: 'varchar' })
  adresse_line1: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  adresse_line2: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  ville: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  codepostal: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  departement: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  pays: string;
  /*   @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  photo1: string; */
  @OneToMany(() => Photo, (photo) => photo.user, { cascade: true })
  photos: Photo[];
  @ManyToMany(() => Album, (album) => album.user, {
    eager: true,
    cascade: true,
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
