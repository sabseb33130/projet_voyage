import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ConflictException,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import PhotosService from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UsersService from 'src/users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AlbumsService } from 'src/albums/albums.service';
import { GetUser } from 'src/auth/get_user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './middleware/fileFilter';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api/photos')
export default class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly usersService: UsersService,
    private readonly albumsService: AlbumsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter })) //Nom du fichier dans le champs du formulaire HTML et nombre maximum de photos
  @Post('uploads')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
    @GetUser() user,
  ) {
    const userOne = await this.usersService.findOneById(user.UserId);
    const verifAlbum = await this.albumsService.findOne(
      +createPhotoDto.albumId,
    );
    if (!verifAlbum) throw new NotFoundException('L album nexiste pas');
    console.log(file.originalname);

    const newPhoto = await this.photosService.findOneNom(file.originalname);
    if (newPhoto && verifAlbum)
      throw new ConflictException('Photo déjà enregistrée');

    const photoNew = await this.photosService.create(
      createPhotoDto,
      userOne,
      file,
    );
    return {
      status: 201,
      message: 'Votre photo a été bien ajoutée',
      data: photoNew,
    };
  }

  @Get()
  async findAll() {
    const allPhoto = await this.photosService.findAll();
    if (!allPhoto) {
      throw new NotFoundException('Pas de photo encore enregistrée');
    }
    console.log(allPhoto);

    return {
      status: 200,
      message: 'Voici toutes les photos enregistrées',
      data: allPhoto,
    };
  }
  /*  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) */
  @Get('file/:id')
  async getFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photosService.findOne(id); //Permet de trouver ma photo
    const filePhoto = photo.map((data) => data.photo); //permet d'utiliser le nom du fichier blob dans mon dossier Uploads de mon back
    res.set({
      /* 'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${filePhoto}.blob"`, */
    });
    /*  const mimeType = photo.map((dato) => dato.mimeType.toString()); */ //test

    const file = createReadStream(join(process.cwd(), `uploads/${filePhoto}`)); //Permet de créer le chemin du d'accès du fichier .
    const result = new StreamableFile(file); //renvoi le fichier pour l'utiliser

    return result;
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const photoId = await this.photosService.findOne(id);
    if (!photoId) {
      throw new NotFoundException("La photo recherchée n'existe pas.");
    }
    return {
      status: 200,
      message: 'Voici la photo enregistrée',
      data: photoId,
    };
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    const upPhoto = await this.photosService.findOne(id);
    if (!upPhoto) {
      throw new NotFoundException(`La photo n'existe pas `);
    }
    const verifAlbum = await this.albumsService.findOne(
      +updatePhotoDto.albumId,
    );
    if (verifAlbum)
      throw new ConflictException('La photo est déjà dans l album');
    const photoUp = await this.photosService.update(id, updatePhotoDto);
    return {
      status: 200,
      message: 'Voici la photo enregistrée',
      data: photoUp,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const delPhoto = await this.photosService.findOne(id);
    if (!delPhoto) {
      throw new NotFoundException('La photo est déjà supprimée.');
    }
    const photoDel = await this.photosService.remove(id);
    return {
      status: 200,
      message: `Cette photo vient d'être supprimée`,
      data: photoDel,
    };
  }
}
