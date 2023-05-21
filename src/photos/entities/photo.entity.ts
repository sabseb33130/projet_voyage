import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  file: string;
  @ApiProperty()
  @Column({ nullable: true })
  description: string;
  @ManyToMany(() => Album, (album) => album.photos, { onDelete: 'CASCADE' ,onUpdate:'CASCADE'})
  albums: Album[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE',onUpdate:'CASCADE' })
  user: User;
}
