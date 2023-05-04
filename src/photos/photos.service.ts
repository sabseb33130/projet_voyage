import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import Photo from './entities/photo.entity';
import User from 'src/users/entities/user.entity';
import Album from 'src/albums/entities/album.entity';

@Injectable()
export default class PhotosService {
  /*   async create(
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

  async findOne(id: number): Promise<Photo | undefined> {
    const onePhoto = await Photo.find({ where: { id: id } });

    return onePhoto[0];
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
  } */

  //test
  async create(
    user: User,
    files: Array<Express.Multer.File>,
    createPhotoDto: CreatePhotoDto,
  ): Promise<Photo | undefined> {
    const album = await Album.findOneBy({ id: +createPhotoDto.albumId });
    console.log('fileback', files);
    const newPhoto = new Photo();
    files.map((file) => {
      newPhoto.user = user;
      newPhoto.file = file.filename;
      newPhoto.originalName = file.originalname;
      newPhoto.albums = [album];
      Photo.save(newPhoto);
    });

    return newPhoto;
  }
  async findAll(): Promise<Photo[] | undefined> {
    const allPhoto = await Photo.find();

    return allPhoto;
  }

  async findOne(id: number): Promise<Photo | undefined> {
    const onePhoto = await Photo.find({ where: { id: id } });

    return onePhoto[0];
  }
  async findOneNom(photo: string): Promise<Photo | undefined> {
    const nomPhoto = await Photo.findOneBy({ originalName: photo });
    return nomPhoto;
  }

  async remove(id: number) {
    const deletedImage = await Photo.findOneBy({ id });
    console.log(deletedImage);

    deletedImage.remove();
    if (deletedImage) {
      return deletedImage;
    }
    return undefined;
  }
}
