import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import Photo from './entities/photo.entity';
import User from 'src/users/entities/user.entity';
import Album from 'src/albums/entities/album.entity';
import { GetUser } from 'src/auth/get_user.decorator';

@Injectable()
export default class PhotosService {
  async create(
    createPhotoDto: CreatePhotoDto,
    user: User,
    file: Express.Multer.File,
  ): Promise<Photo | undefined> {
    const test = await Album.findOneBy({ id: +createPhotoDto.albumId });
    const newPhoto = new Photo();
    newPhoto.user = user;
    newPhoto.photo = file.filename;
    newPhoto.information = file.originalname;
    newPhoto.mimeType = file.mimetype;
    newPhoto.albums = [test];
    await Photo.save(newPhoto);
    return newPhoto;
  }

  async findAll(): Promise<Photo[] | undefined> {
    const allPhoto = await Photo.find();
    return allPhoto;
  }

  async findOne(id: number): Promise<Photo[] | undefined> {
    const onePhoto = await Photo.find({ where: { id: id } });
    return onePhoto;
  }
  async findOneNom(photo: string): Promise<Photo | undefined> {
    const nomPhoto = await Photo.findOneBy({ photo });
    return nomPhoto;
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo | undefined> {
    let updatePhoto = new Photo();
    const photoUp = await Album.find({
      where: { id: +updatePhotoDto.albumId },
    });

    updatePhoto.albums = photoUp;
    await Photo.save(updatePhoto);
    const upPhoto = await Photo.findOneBy({ id });
    return upPhoto;
  }

  async remove(id: number): Promise<Photo[] | undefined> {
    const delPhoto = await Photo.findBy({ id });
    await Photo.remove(delPhoto);
    return delPhoto;
  }
}
