import User from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Invitations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  invitation: string;

  /*   @Column({ type: 'varchar', default: 'en attente' })
  invitation_ok: string;

  @Column({ type: 'integer', default: 0 })
  Access_level: number; */
  @ManyToOne(() => User, (user) => user.invitations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: number;
}
