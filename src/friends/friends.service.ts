import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  create(
    createFriendDto: CreateFriendDto,
    /* userId: number, */
  ): Promise<Friend | undefined> {
    const addFriend = new Friend();
    addFriend.invitation = createFriendDto.invitation;
    /*  addFriend.user[0].id = userId; */
    const newFriend = addFriend.save();
    console.log(addFriend);

    return newFriend;
  }

  async findAll(): Promise<Friend[] | undefined> {
    const allFriend = await Friend.find();
    return allFriend;
  }

  async findOne(id: number): Promise<Friend | undefined> {
    const oneFriend = await Friend.findOneBy({ id });
    return oneFriend;
  }
  async findOneInvit(invitation: string): Promise<Friend | undefined> {
    const oneFriend = await Friend.findOneBy({ invitation });
    return oneFriend;
  }

  async update(
    id: number,
    updateFriendDto: UpdateFriendDto,
  ): Promise<Friend | undefined> {
    await Friend.update(id, updateFriendDto);
    const upFriend = await Friend.findOneBy({ id });
    return upFriend;
  }

  async remove(id: number): Promise<Friend[] | undefined> {
    const delFriend = await Friend.findBy({ id });
    await Friend.remove(delFriend);
    return delFriend;
  }
}
