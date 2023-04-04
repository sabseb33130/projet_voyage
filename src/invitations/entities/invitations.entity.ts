import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invitations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  invitation: string;

  @Column({ type: 'varchar', default: 'en attente' })
  invitation_ok: string;

  @Column({ type: 'integer', default: 0 })
  Access_level: number;
}
