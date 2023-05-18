import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class PhotosService {
  /**
   *
   * @param user envoi le payload
   * @param files envoi le fichier photo traité par multer
   * @param createPhotoDto envoi le numéro de l'albumId
   * @returns Photo[]
   * files est le dossier qui peut contenir une a 8 photos donxc je le map avant de le save dans la table photo
   */
  async create(
    user: User,
    file: Express.Multer.File,
    createPhotoDto: CreatePhotoDto,
  ): Promise<Photo | undefined> {
    const album = await Album.findOneBy({ id: +createPhotoDto.albumId });
    const newPhoto = new Photo();

    newPhoto.user = user;
    newPhoto.file = file.filename;
    newPhoto.originalName = file.originalname;
    newPhoto.description = createPhotoDto.description;
    newPhoto.albums = [album];
    newPhoto.save();

    return newPhoto;
  }
  async findAll(user: number): Promise<Photo[][] | undefined> {
    const albumUser = await User.findOneBy({ id: user });
    const allPhotos = albumUser.albums.map((elm) => elm.photos);

    return allPhotos;
  }

  async findOne(id: number): Promise<Photo | undefined> {
    const onePhoto = await Photo.find({ where: { id: id } });

    return onePhoto[0];
  }
  async findOneNom(photo: string): Promise<Photo | undefined> {
    const nomPhoto = await Photo.findOneBy({ originalName: photo });
    return nomPhoto;
  }
  /**
   *
   * @param id numéro de la photo
   * @param updatePhotoDto contient l'album qui peut être ajouter et la description qui peut-être modifier
   * @returns photo[]
   * la const updatePhoto récupére la photo {id,originalname,file,description}
   * la const albumId récupère l'album en cas d'ajout de la photo dans un autre album.
   *
   */
  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo | undefined> {
    const updatePhoto = await Photo.findOneBy({ id: id });
    const albumId = await Album.findOneBy({ id: updatePhotoDto.albumId });
    const verifAlbum = albumId.id !== +updatePhotoDto.albumId;

    updatePhoto.description = updatePhotoDto.description;
    if (verifAlbum) {
      updatePhoto?.albums.push(albumId);
    }
    const upPhoto = updatePhoto.save();
    return upPhoto;
  }

  async remove(id: number): Promise<Photo | undefined> {
    const deletedImage = await Photo.findOneBy({ id });

    deletedImage.remove();
    if (deletedImage) {
      return deletedImage;
    }
    return undefined;
  }
}
