import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateInvitationsDto } from './create-invitations.dto';

export class UpdateInvitationsDto extends PartialType(CreateInvitationsDto) {}
