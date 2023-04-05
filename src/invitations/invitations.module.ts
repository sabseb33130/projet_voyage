import { Module } from '@nestjs/common';
import InvitationsController from './invitation.controller';
import InvitationsService from './invitations.service';

@Module({
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
