import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  NotFoundException,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import FriendsService from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get_user.decorator';
import UsersService from 'src/users/users.service';
import User from 'src/users/entities/user.entity';

@Controller('friends')
@ApiTags('friends')
@UseInterceptors(ClassSerializerInterceptor)
export default class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateFriendDto })
  @Post()
  async create(@Body() createFriendDto: CreateFriendDto, @GetUser() GetUser) {
    const verifFriend = await this.usersService.findOneUser(
      createFriendDto.friend,
    );

    if (!verifFriend) throw new NotFoundException();

    return this.friendsService.create(GetUser, verifFriend);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findMyFriends(@GetUser() user: User) {
    return (await this.friendsService.findFriend(user)).map((elm) =>
      elm.user.id !== user.id ? elm.user : elm.friend,
    );
  }

  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiBearerAuth() // marque cette route d'un cadenas dans swagger UI
  @Get('/request')
  getFriendRequests(@GetUser() user: User) {
    return this.friendsService.friendRequest(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/request/:id')
  acceptFriendRequest(@Param('id') id: string) {
    return this.friendsService.friendAccept(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.friendsService.removeRequest(+id, user);
  }
}
