import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PhotoIdentite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photoIdentite: string;
  @Column()
  information: string;

  @Column()
  mimeType: string;
  @OneToOne(() => User, (user) => user.photoIdentites)
  user: User;
}
