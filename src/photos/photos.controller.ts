import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PhotosService from './photos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UsersService from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from './middleware/fileFilter';
import { GetUser } from 'src/auth/get_user.decorator';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import { UpdatePhotoDto } from './dto/update-photo.dto';
@Controller('api/photos')
export default class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly usersService: UsersService,
    private readonly albumsService: AlbumsService,
  ) {}
  //FileInterceptor prend 2 arguments, un fieldname et un objet d'options facultatif(vérif les types de fichiers corrects et donner un nom perso dans le répertoire)
  //fonction utilisable avec multer retourne un moteur de stockage implémenté pour stocker les photos en local.
  @UseGuards(JwtAuthGuard)
  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('monimage', 8, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  async addNewImage(
    @Body() createPhotoDto: CreatePhotoDto,
    @GetUser() user,
    @UploadedFiles() savedFiles: Array<Express.Multer.File>,
  ) {
    const userOne = await this.usersService.findOneById(user.userId);
    const verifAlbum = await this.albumsService.findOne(createPhotoDto.albumId);

    if (!verifAlbum) throw new NotFoundException('L album nexiste pas');

    const view = await this.photosService.create(
      userOne,
      savedFiles,
      createPhotoDto,
    );

    return {
      statusCode: 201,
      message: 'Votre photo ou vos photos ont été ajoutée',
      data: view,
    };
  }
  @Get(':imgpath')
  async seeUploadedFile(@Param('imgpath') file, @Res() res) {
    return res.sendFile(file, { root: './uploads' });
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Suppression d'une photo " })
  @ApiResponse({ status: 200, description: 'Photo supprimée avec succès' })
  async removeImage(@Param('id', ParseIntPipe) id: number) {
    const response = await this.photosService.findOne(id);
    if (!response) {
      throw new NotFoundException("Cette photo n'existe pas ou plus");
    }
    const album = await this.albumsService.findAll();
    const test = album.map((data) =>
      data.photos.filter((elm) => elm.file === response.file),
    );

    test.length > 1
      ? await this.photosService.remove(id)
      : (await this.photosService.remove(id),
        fs.unlink(`./uploads/${response.file}`, (err) => {
          if (err) {
            return err;
          }
        }));
    return {
      status: 200,
      message: `Votre photo a bien été supprimée`,
      data: response,
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
    /*   if (verifAlbum)
      throw new ConflictException('La photo est déjà dans l album'); */
    const photoUp = await this.photosService.update(id, updatePhotoDto);
    return {
      status: 200,
      message: 'Voici la photo enregistrée',
      data: photoUp,
    };
  }
}
