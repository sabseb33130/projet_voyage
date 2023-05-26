import { Injectable } from '@nestjs/common';
import { UpdatePhotoIdentiteDto } from './dto/update-photo-identite.dto';
import { User } from 'src/users/entities/user.entity';
import { PhotoIdentite } from './entities/photo-identite.entity';

@Injectable()
export class PhotoIdentiteService {
  async create(
    user: User,
    file: Express.Multer.File,
  ): Promise<PhotoIdentite | undefined> {
    const newPhoto = new PhotoIdentite();
    newPhoto.user = user;
    newPhoto.photoIdentite = file.filename;
    newPhoto.information = file.originalname;
    newPhoto.mimeType = file.mimetype;
    await PhotoIdentite.save(newPhoto);
    return newPhoto;
  }

  async findOne(id: number): Promise<PhotoIdentite | undefined> {
    const onePhoto = await PhotoIdentite.findOneBy({ id });
    return onePhoto;
  }
  async findOnePhoto(
    photoIdentite: string,
  ): Promise<PhotoIdentite | undefined> {
    const photoIdentites = await PhotoIdentite.findOneBy({ photoIdentite });
    return photoIdentites;
  }

  async update(id: number, updatePhotoIdentiteDto: UpdatePhotoIdentiteDto) {
    const photo = await PhotoIdentite.findOneBy({ id });
    const updatePhoto = new PhotoIdentite();
    updatePhoto.photoIdentite = photo.photoIdentite;
    updatePhoto.information = photo.information;
    updatePhoto.mimeType = photo.mimeType;
    await PhotoIdentite.save(updatePhoto);
    return updatePhoto;
  }

  async remove(id: number) {
    const delPhoto = await PhotoIdentite.findBy({ id });
    await PhotoIdentite.remove(delPhoto);
    return delPhoto;
  }
}
