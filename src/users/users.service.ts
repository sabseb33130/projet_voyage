import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, hash: string) {
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

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async findOneByPseudo(pseudo: string) {
    const user = await User.findOne({ where: { pseudo: pseudo } });

    if (user) {
      return user;
    }

    return undefined;
  }

  async findOneUser(pseudo: string) {
    const user = await User.find({});
    console.log(user);

    return user;
  }

  async findOneByEmail(email: string) {
    const userMail = await User.findOne({ where: { email: email } });

    return userMail;
  }

  async findOneById(id: number) {
    const user = await User.findOneBy({ id });

    if (user) {
      return user;
    }

    return undefined;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await User.update(id, updateUserDto);

    const newUser = await User.findOneBy({
      id: id,
    });

    return newUser;
  }

  async delete(id: number) {
    const deleteUser = await User.findOneBy({ id: id });
    User.remove(deleteUser);
    return deleteUser;
  }
}
