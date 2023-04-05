import User from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export default class Friends extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isFriends: boolean;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;
  @ManyToOne(() => User, (user) => user.friends)
  friend: User;
}
