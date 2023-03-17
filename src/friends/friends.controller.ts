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
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async create(@Body() createFriendDto: CreateFriendDto) {
    const newFriend = await this.friendsService.findOneInvit(
      createFriendDto.invitation,
    );
    if (newFriend) {
      throw new NotFoundException('Invitation déjà envoyée.');
    }
    const friendNew = await this.friendsService.create(createFriendDto);

    return {
      status: 201,
      message: 'Invitation envoyée',
      data: friendNew,
    };
  }

  @Get()
  async findAll() {
    const allFriend = await this.friendsService.findAll();
    if (allFriend === undefined) {
      throw new NotFoundException("Pas d'invitation enregistrée.");
    }
    return {
      status: 200,
      message: 'Voici toutes les invitations envoyées.',
      data: allFriend,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const oneFriend = await this.friendsService.findOne(id);
    if (!oneFriend) {
      throw new NotFoundException("Cette invitation n'existe pas.");
    }
    return {
      status: 200,
      message: `Voici toutes l'invitation envoyée.`,
      data: oneFriend,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFriendDto: UpdateFriendDto,
  ) {
    const upFriend = await this.friendsService.findOne(id);
    if (!upFriend) {
      throw new NotFoundException("Cette invitation n'existe pas");
    }
    const friendUp = await this.friendsService.update(id, updateFriendDto);
    return {
      status: 200,
      message: `Vous avez une réponse à l'invitation`,
      data: friendUp,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const delFriend = await this.friendsService.findOne(id);
    if (!delFriend) {
      throw new NotFoundException('Cette invitation est déjà supprimée');
    }
    const friendDel = await this.friendsService.remove(id);
    return {
      status: 200,
      message: `Votre invitation est supprimée`,
      data: friendDel,
    };
  }
}
