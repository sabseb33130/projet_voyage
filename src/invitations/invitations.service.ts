import { Injectable } from '@nestjs/common';
import { Invitations } from './entities/invitations.entity';
import { CreateInvitationsDto } from './dto/create-invitations.dto';
import { UpdateInvitationsDto } from './dto/update-invitations.dto';

@Injectable()
export class InvitationsService {
  create(
    createInvitationsDto: CreateInvitationsDto,
    userId: number,
  ): Promise<Invitations | undefined> {
    const addInvitations = new Invitations();
    addInvitations.user_email = createInvitationsDto.user_email;
    addInvitations.nom_invite = createInvitationsDto.nom_invite;
    addInvitations.user = userId;
    addInvitations.id_invitation = createInvitationsDto.id_invitation;

    const newInvitations = addInvitations.save();

    return newInvitations;
  }

  async findAll(): Promise<Invitations[] | undefined> {
    const allInvitations = await Invitations.find();
    return allInvitations;
  }

  async findOne(id: number): Promise<Invitations | undefined> {
    const oneInvitations = await Invitations.findOneBy({ id });
    return oneInvitations;
  }
  async findOneInvit(user_email: string): Promise<Invitations | undefined> {
    const oneInvitations = await Invitations.findOneBy({ user_email });
    return oneInvitations;
  }

  async update(
    id: number,
    updateInvitationsDto: UpdateInvitationsDto,
  ): Promise<Invitations | undefined> {
    await Invitations.update(id, updateInvitationsDto);
    const upInvitations = await Invitations.findOneBy({ id });
    return upInvitations;
  }

  async remove(id: number): Promise<Invitations[] | undefined> {
    const delInvitations = await Invitations.findBy({ id });
    await Invitations.remove(delInvitations);
    return delInvitations;
  }
}
