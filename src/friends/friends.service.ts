import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import Friends from './entities/friend.entity';
import User from 'src/users/entities/user.entity';

@Injectable()
export default class FriendsService {
  async create(createFriendDto, id) {
    const newFriend = new Friends();
    newFriend.friend = createFriendDto.friend;
    newFriend.user = id;
    const createFriend = Friends.save(newFriend);
    return createFriend;
  }

  async findFriend(user: User) {
    const friendFind = await Friends.find({
      where: [
        { isFriends: true, user: { id: user.id } },
        { isFriends: true, friend: { id: user.id } },
      ],
      relations: { user: true, friend: true },
    });
    return friendFind;
  }
  async friendRequest(user: User) {
    const requestFriend = await Friends.find({
      where: {
        isFriends: false,
        user: { id: user.id },
      },
      relations: { user: true },
    });
    return requestFriend;
  }
  async friendAccept(id: number) {
    {
      const friend = await Friends.findOneBy({ id });

      if (!friend) throw new NotFoundException();

      friend.isFriends = true;
      return await friend.save();
    }
  }

  async removeRequest(id: number, user: User) {
    const removeFriend = await Friends.findOne({
      where: {
        user: {
          id: user.id,
        },
        friend: {
          id: id,
        },
      },
    });
    const deleteFriend = await removeFriend.remove();
    return deleteFriend;
  }
}
