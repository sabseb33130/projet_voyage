import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import Album from 'src/albums/entities/album.entity';

@Injectable()
export default class UsersService {
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
    newUser.adresse_line1 = createUserDto.adresse_line1;
    newUser.adresse_line2 = createUserDto.adresse_line2;
    newUser.ville = createUserDto.ville;
    newUser.codepostal = createUserDto.codepostal;
    newUser.departement = createUserDto.departement;
    newUser.pays = createUserDto.pays;
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
    console.log(updateUserDto.codepostal);
    console.log(newUser.codepostal);

    if (updateUserDto.adresse_line1)
      newUser.adresse_line1 = updateUserDto.adresse_line1;
    if (updateUserDto.adresse_line2)
      newUser.adresse_line2 = updateUserDto.adresse_line2;
    if (updateUserDto.codepostal)
      newUser.departement = updateUserDto.codepostal;
    if (updateUserDto.departement)
      newUser.departement = updateUserDto.departement;
    if (updateUserDto.email) newUser.email = updateUserDto.email;
    if (updateUserDto.nom) newUser.nom = updateUserDto.nom;
    if (updateUserDto.pays) newUser.pays = updateUserDto.pays;
    if (updateUserDto.prenom) newUser.prenom = updateUserDto.prenom;
    if (updateUserDto.ville) newUser.ville = updateUserDto.ville;
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
