import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Photo } from './entities/photo.entity';

@Controller('api/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    const newPhoto = await this.photosService.findOneNom(
      createPhotoDto.nom_photo,
    );
    if (newPhoto) {
      throw new BadRequestException('Photo déjà enregistrée');
    }
    const photoNew = await this.photosService.create(createPhotoDto);
    return {
      status: 201,
      message: 'Votre photo a été bien ajouté',
      data: photoNew,
    };
  }

  @Get()
  async findAll() {
    const allPhoto = await this.photosService.findAll();
    if (allPhoto) {
      throw new NotFoundException('Pas de photo encore enregistrée');
    }
    return {
      status: 200,
      message: 'Voici toutes les photos enregistrées',
      data: allPhoto,
    };
  }

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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    const upPhoto = await this.photosService.findOne(id);
    if (!upPhoto) {
      throw new NotFoundException(`La photo n'existe pas `);
    }
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
