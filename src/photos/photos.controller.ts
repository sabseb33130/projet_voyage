import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PhotosService from './photos.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import UsersService from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  /*  editFileName, */ editFileName,
  fileFilter,
} from './middleware/fileFilter';
import { GetUser } from 'src/auth/get_user.decorator';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/photos')
export default class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly usersService: UsersService,
    private readonly albumsService: AlbumsService,
  ) {}

  //test
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
    console.log('verif newImage');

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
  async removeImage(
    @Param('id', ParseIntPipe) id: number,
    /* @Body() albumId: number, */
  ) {
    const response = await this.photosService.findOne(id);
    /* const album = await this.albumsService.findOne(albumId); */
    /*  if (album) */
    if (!response) {
      throw new NotFoundException("Cette photo n'existe pas ou plus");
    }
    await this.photosService.remove(id);
    console.log(response);

    return {
      status: 200,
      message: `Votre photo a bien été supprimée`,
      data: response,
    };
  }
  /*  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter })) //Nom du fichier dans le champs du formulaire HTML et nombre maximum de photos
  @Post('uploads')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
    @GetUser() user,
  ) {
    const userOne = await this.usersService.findOneById(user.userId);
    const verifAlbum = await this.albumsService.findOne(
      +createPhotoDto.albumId,
    );
    if (!verifAlbum) throw new NotFoundException('L album nexiste pas');

    const newPhoto = await this.photosService.findOneNom(file.originalname);
    if (newPhoto && verifAlbum)
      throw new ConflictException('Photo déjà enregistrée');

    const photoNew = await this.photosService.create(
      createPhotoDto,
      userOne,
      file,
    );
    console.log(photoNew);

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

    return {
      status: 200,
      message: 'Voici toutes les photos enregistrées',
      data: allPhoto,
    };
  }
  /*  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @Get('file/:id')
  async getFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photosService.findOne(id); //Permet de trouver ma photo
    const filePhoto = photo.photo; //me permet de récupérer la référence du blob

    const file = createReadStream(join(process.cwd(), `uploads/${filePhoto}`)); //permet de rendre le blob lisible.
    console.log(join(process.cwd(), `uploads/${filePhoto}`));
    res.set({
      'Content-Type': 'image/png',
      // 'Content-Disposition': `attachment; filename= "${file}"`,
    }); //typage du header

    const result = new StreamableFile(file);

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
    return photoId   status: 200,
      message: 'Voici la photo enregistrée',
      data: ;
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
  } */
}
