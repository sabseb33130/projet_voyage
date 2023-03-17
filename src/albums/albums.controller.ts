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
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const verifAlbum = await this.albumsService.findOneNom(
      createAlbumDto.nom_album,
    );

    if (verifAlbum) {
      throw new ConflictException('Album déjà créé ');
    }
    const albumNew = this.albumsService.create(createAlbumDto);
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
  ) {
    const verifAlbum = await this.albumsService.findOneNom(
      updateAlbumDto.nom_album,
    );
    const upAlbum = this.albumsService.update(+id, updateAlbumDto);
    if (!verifAlbum) {
      throw new NotFoundException("Cette album n'existe pas");
    }
    return {
      statusCode: 201,
      message: 'Modifications enregistrées.',
      data: { upAlbum },
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const oneAlbum = await Album.findOneBy({ id });
    if (!oneAlbum) {
      throw new NotFoundException(`L'album n'existe pas ou est déjà supprimé`);
    }
    const removedAlbum = await this.albumsService.delete(id);

    return {
      status: 200,
      message: `Le compte numéro ${id} a été supprimé`,
      data: removedAlbum,
    };
  }
}
