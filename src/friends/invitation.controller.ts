import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateInvitationsDto } from './dto/create-invitations.dto';
import { UpdateInvitationsDto } from './dto/update-invitations.dto';
import { InvitationsService } from './invitations.service';

@Controller('api/Invitationss')
export class InvitationsController {
  InvitationssService: any;
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async create(@Body() createInvitationsDto: CreateInvitationsDto) {
    const newInvitations = await this.invitationsService.findOneInvit(
      createInvitationsDto.invitation,
    );
    if (newInvitations) {
      throw new NotFoundException('Invitation déjà envoyée.');
    }
    const InvitationsNew = await this.invitationsService.create(
      createInvitationsDto,
    );

    return {
      status: 201,
      message: 'Invitation envoyée',
      data: InvitationsNew,
    };
  }

  @Get()
  async findAll() {
    const allInvitations = await this.invitationsService.findAll();
    if (allInvitations === undefined) {
      throw new NotFoundException("Pas d'invitation enregistrée.");
    }
    return {
      status: 200,
      message: 'Voici toutes les invitations envoyées.',
      data: allInvitations,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const oneInvitations = await this.invitationsService.findOne(id);
    if (!oneInvitations) {
      throw new NotFoundException("Cette invitation n'existe pas.");
    }
    return {
      status: 200,
      message: `Voici toutes l'invitation envoyée.`,
      data: oneInvitations,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInvitationsDto: UpdateInvitationsDto,
  ) {
    const upInvitations = await this.invitationsService.findOne(id);
    if (!upInvitations) {
      throw new NotFoundException("Cette invitation n'existe pas");
    }
    const InvitationsUp = await this.invitationsService.update(
      id,
      updateInvitationsDto,
    );
    return {
      status: 200,
      message: `Vous avez une réponse à l'invitation`,
      data: InvitationsUp,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const delInvitations = await this.InvitationssService.findOne(id);
    if (!delInvitations) {
      throw new NotFoundException('Cette invitation est déjà supprimée');
    }
    const InvitationsDel = await this.InvitationssService.remove(id);
    return {
      status: 200,
      message: `Votre invitation est supprimée`,
      data: InvitationsDel,
    };
  }
}
