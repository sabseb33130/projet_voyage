import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateInvitationsDto } from './dto/create-invitations.dto';
import { UpdateInvitationsDto } from './dto/update-invitations.dto';
import { InvitationsService } from './invitations.service';
import { GetUser } from 'src/auth/get_user.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/Invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}
  @ApiBody({ type: CreateInvitationsDto })
  @Post()
  async create(
    @Body() createInvitationsDto: CreateInvitationsDto,
    @GetUser() user,
  ) {
    console.log(createInvitationsDto);

    const newInvitations = await this.invitationsService.findOneInvit(
      createInvitationsDto.user_email,
    );
    if (newInvitations) {
      throw new NotFoundException('Invitation déjà envoyée.');
    }
    const InvitationsNew = await this.invitationsService.create(
      createInvitationsDto,
      user.userId,
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
    const delInvitations = await this.invitationsService.findOne(id);
    if (!delInvitations) {
      throw new NotFoundException('Cette invitation est déjà supprimée');
    }
    const InvitationsDel = await this.invitationsService.remove(id);
    return {
      status: 200,
      message: `Votre invitation est supprimée`,
      data: InvitationsDel,
    };
  }
}
