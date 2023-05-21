import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invitations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  user_email: string;
  @Column({ type: 'varchar', nullable: true })
  nom_invite: string;

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
