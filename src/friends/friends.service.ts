import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friends } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  async create(createFriendDto: CreateFriendDto) {
    const newFriend = new Friends();
    newFriend.isFriends = createFriendDto.isFriends;
    const addFriend = await newFriend.save();
    return addFriend;
  }

  async findAll() {
    const allFriends = await Friends.find();
    return allFriends;
  }

  async findOne(id: number) {
    const oneFriend = await Friends.findOneBy({ id: id });
    return oneFriend;
  }

  async update(id: number, updateFriendDto: UpdateFriendDto) {
    await Friends.update(id, updateFriendDto);
    const findOne = await Friends.findOneBy({ id: id });
    return findOne;
  }

  async remove(id: number) {
    const findOne = await Friends.findOneBy({ id });
    const removedFriend = await findOne.remove();
    return removedFriend;
  }
}
