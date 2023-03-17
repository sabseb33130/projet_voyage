import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  async create(createPhotoDto: CreatePhotoDto): Promise<Photo | undefined> {
    const newPhoto = new Photo();
    newPhoto.nom_photo = createPhotoDto.nom_photo;
    await newPhoto.save();
    return newPhoto;
  }

  async findAll(): Promise<Photo[] | undefined> {
    const allPhoto = await Photo.find();
    return allPhoto;
  }

  async findOne(id: number): Promise<Photo | undefined> {
    const onePhoto = await Photo.findOneBy({ id });
    return onePhoto;
  }
  async findOneNom(nom_photo): Promise<Photo | undefined> {
    const nomPhoto = await Photo.findOneBy({ nom_photo });
    return nomPhoto;
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo | undefined> {
    await Photo.update(id, updatePhotoDto);
    const upPhoto = await Photo.findOneBy({ id });
    return upPhoto;
  }

  async remove(id: number): Promise<Photo[] | undefined> {
    const delPhoto = await Photo.findBy({ id });
    await Photo.remove(delPhoto);
    return delPhoto;
  }
}
