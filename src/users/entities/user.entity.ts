import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Album } from 'src/albums/entities/album.entity';
import { Friend } from 'src/friends/entities/friend.entity';
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
  @Column({ type: 'varchar' })
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
  @Column({ type: 'integer' })
  codepostal: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  departement: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  pays: string;
  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
