import { Module } from '@nestjs/common';
import { InvitationsController } from './invitation.controller';
import { InvitationsService } from './invitations.service';

import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService, UsersService],
})
export class InvitationsModule {}
