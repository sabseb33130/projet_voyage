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
  @Column({ type: 'varchar', nullable: true })
  id_invitation: string;

  @ManyToOne(() => User, (user) => user.invitations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: number;
}
