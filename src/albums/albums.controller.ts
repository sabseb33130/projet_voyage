import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get_user.decorator';
import { UsersService } from 'src/users/users.service';

import { PhotosService } from 'src/photos/photos.service';
import { Photo } from 'src/photos/entities/photo.entity';
import * as fs from 'fs';
@UseGuards(JwtAuthGuard)
@ApiTags('albums')
@Controller('api/albums')
@ApiBearerAuth()
export class AlbumsController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly albumsService: AlbumsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @GetUser() user) {
    const user1 = await this.usersService.findOneById(user.userId);
    //Vérification q'un album avec le même nom existe déjà
    const nomAlbumVerif = user1.albums.find(
      (elm) => elm.nom_album === createAlbumDto.nom_album,
    );
    const dateAlbumVerif = user1.albums.find(
      (elm) => elm.date_debut === createAlbumDto.date_debut,
    );

    if (nomAlbumVerif && dateAlbumVerif)
      throw new ConflictException('Album déjà créé ');

    const albumNew = await this.albumsService.create(createAlbumDto, user1);

    return {
      statusCode: 201,
      message: 'Nouvel album créé',
      data: albumNew,
    };
  }

  @Get()
  async findAll() {
    const allAlbums = await this.albumsService.findAll();
    if (!allAlbums) {
      throw new NotFoundException("Pas d'album enregistré");
    }

    return allAlbums;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const oneAlbum = await this.albumsService.findOne(+id);
    if (!oneAlbum) {
      throw new NotFoundException("Cette album n'existe pas .");
    }
    return oneAlbum;
  }
  @ApiBody({ type: UpdateAlbumDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @GetUser() user,
  ) {
    const user1 = await this.usersService.findOneById(user.userId);

    const upAlbum = await this.albumsService.update(+id, updateAlbumDto, user1);

    return {
      statusCode: 201,
      message: 'Modifications enregistrées.',
      data: upAlbum,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const oneAlbum = await this.albumsService.findOne(id);
    if (!oneAlbum) {
      throw new NotFoundException(`L'album n'existe pas ou est déjà supprimé`);
    }
    let photo: Photo[][];
    for (const elm of oneAlbum.photos) {
      const album = await this.albumsService.findAll();
      photo = album.map((data) =>
        data.photos.filter((data) => data.originalName === elm.originalName),
      );

      photo.length === 1
        ? (await this.photosService.remove(elm.id),
          fs.unlink(`./uploads/${elm.originalName}`, (err) => {
            if (err) {
              return err;
            }
          }))
        : await this.photosService.remove(elm.id);
    }

    const removedAlbum = await this.albumsService.delete(oneAlbum.id);
    return {
      status: 200,
      message: `L'album ${removedAlbum.nom_album} dont le numéro est ${id} a été supprimé`,
      data: removedAlbum,
    };
  }
}
