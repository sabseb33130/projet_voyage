import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ConflictException,
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { PhotoIdentiteService } from './photo-identite.service';
import { UpdatePhotoIdentiteDto } from './dto/update-photo-identite.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { fileFilter } from 'src/photos/middleware/fileFilter';
import { GetUser } from 'src/auth/get_user.decorator';
import { createReadStream } from 'fs';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';
import type { Response } from 'express';
@Controller('api/photo-identite')
export class PhotoIdentiteController {
  constructor(private readonly photoIdentiteService: PhotoIdentiteService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter })) //Nom du fichier dans le champs du formulaire HTML et nombre maximum de photos
  @Post('uploads')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    const verifPhoto = await this.photoIdentiteService.findOnePhoto(
      file.originalname,
    );
    if (verifPhoto)
      throw new ConflictException('Cette photo est déjà en place.');
    const photoNew = await this.create(file, user);
    return {
      status: 201,
      message: 'Votre photo viens d être ajoutée',
      data: photoNew,
    };
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFile(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const photo = await this.photoIdentiteService.findOne(id); //Permet de trouver ma photo
    const filePhoto = photo.photoIdentite; //permet d'utiliser le nom du fichier blob dans mon dossier Uploads de mon back

    const file = createReadStream(join(process.cwd(), `uploads/${filePhoto}`)); //Permet de créer le chemin du d'accès du fichier .
    const result = new StreamableFile(file); //renvoi le fichier pour l'utiliser

    return result;
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhotoIdentiteDto: UpdatePhotoIdentiteDto,
  ) {
    return this.photoIdentiteService.update(+id, updatePhotoIdentiteDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoIdentiteService.remove(+id);
  }
}
