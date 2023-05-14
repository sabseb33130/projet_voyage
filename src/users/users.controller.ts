import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
  ConflictException,
  Get,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import UsersService from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get_user.decorator';
import User from './entities/user.entity';

@ApiTags('api/users')
@ApiResponse({ status: 201, description: `Utilisateur enregistré` })
@Controller('api/users')
@UseInterceptors(ClassSerializerInterceptor)
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    const isPseudoExist = await this.usersService.findOneUser(
      createUserDto.pseudo,
    );
    if (isPseudoExist)
      throw new ConflictException(
        'Pseudo déjà utilisé, veuillez changer de pseudo',
      );

    const isEmailExist = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (isEmailExist)
      throw new ConflictException(
        'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );
    const isNomExist = await User.findOne({
      where: {
        nom: createUserDto.nom,
        prenom: createUserDto.prenom,
        adresse_line1: createUserDto.adresse_line1,
      },
    });
    if (isNomExist) throw new ConflictException('Ce compte existe déjà');
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.usersService.create(createUserDto, hash);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: user,
    };
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: `Voici tout les users` })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) {
      throw new NotFoundException('Pas de compte enregistreé pour l instant');
    }
    return users;
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: `Le compte a été supprimé` })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/compteperso')
  async findUser(@GetUser() user) {
    const users = await this.usersService.findOneById(user.userId);

    if (!users)
      throw new NotFoundException('Pas de compte enregistreé pour l instant');

    return {
      statusCode: 200,
      message: 'Voici les données de votre compte',
      data: users,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: `Modifications enregistrées` })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user) {
    const userLogged = user.userId;

    const userUpdate = await this.usersService.update(
      userLogged,
      updateUserDto,
    );

    return {
      statusCode: 201,
      message: 'Modifications enregistrées',
      data: {
        userUpdate,
      },
    };
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: `Le compte a été supprimé` })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  async removeUser(@GetUser() user) {
    const userDeleted: number = user.userId;

    const data = await this.usersService.findOneById(userDeleted);

    if (!data) throw new NotFoundException('Votre compte à déjà été supprimé');

    const userRemoved = await this.usersService.delete(user.userId);

    return {
      status: 200,
      message: `Le compte numéro ${data.id} a été supprimé`,
      data: userRemoved,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('friend/:id')
  async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user,
  ): Promise<[User, User]> {
    const friend = await this.usersService.findOneById(id);
    if (!friend) throw new NotFoundException('Ce user n existe pas.');

    if (id === user.userId)
      throw new ConflictException(
        'Vous êtes entrain de vous demandez en ami!!!',
      );
    const verif1 = await this.usersService.isfriend(id, user.userId);
    const verif = await this.usersService.isfriend(user.userId, id);

    if (verif1 === true || verif === true)
      throw new ConflictException('Vous êtes déjà amis');
    const updateUser = await this.usersService.postfriend(user.userId, id);

    return [updateUser, user];
  }
  @Get('test')
  async test() {
    const test = await this.usersService.getAllfriends(1);
    return test;
  }
}
