import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(
    createUserDto: CreateUserDto,
    hash: string,
  ): Promise<User | undefined> {
    const newUser = new User();
    newUser.prenom = createUserDto.prenom;
    newUser.nom = createUserDto.nom;
    newUser.pseudo = createUserDto.pseudo;
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.photo_identite = createUserDto.photo_identite;
  
    await newUser.save();

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await User.find({
      relations: {
        photos: true,
        invitations: true,
        albums: true,
        friends: true,
      },
    });
    return users;
  }

  async findOneUser(pseudo: string): Promise<User | undefined> {
    const user = await User.findOne({
      relations: {
        photos: true,
        invitations: true,
        albums: true,
        friends: true,
      },
      where: { pseudo: pseudo },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const userMail = await User.findOne({
      relations: {
        photos: true,
        invitations: true,
        albums: true,
        friends: true,
      },
      where: { email: email },
    });

    return userMail;
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await User.findOne({
      relations: {
        photos: true,
        invitations: true,
        albums: true,
        friends: true,
      },
      where: { id: id },
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const newUser = await User.findOne({
      where: { id: id },
      relations: {
        photos: true,
        invitations: true,
        albums: true,
        friends: true,
      },
    });

  
    if (updateUserDto.email) newUser.email = updateUserDto.email;
    if (updateUserDto.nom) newUser.nom = updateUserDto.nom;
   
    const upUser = newUser.save();
    return upUser;
  }

  async delete(id: number): Promise<User | undefined> {
    const deleteUser = await User.findOne({
      relations: { photos: true, invitations: true, albums: true },
      where: { id: id },
    });
    User.remove(deleteUser);
    return deleteUser;
  }

  async postfriend(id: number, friendId: number): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id },
      relations: { friends: true },
    });
    const addFriend = await User.findOneBy({ id: friendId });

    user.friends?.push(addFriend);

    const newUser = await user.save();
    return newUser;
  }
  async getAllfriends(id: number) {
    const users = await User.find({ where: { users: { id } } });
  }
  async isfriend(idInvit: number, friendId: number): Promise<boolean> {
    const friend = await User.find({
      where: { id: friendId },
      relations: { friends: true },
    });

    const test = friend.toString().includes(idInvit.toString());

    const status = test === true ? true : false;

    return status;
  }
}
