import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class AlbumsService {
  async create(
    createAlbumDto: CreateAlbumDto,
    user: User,
  ): Promise<Album | undefined> {
    const newAlbum = new Album();
    newAlbum.nom_album = createAlbumDto.nom_album;
    if(createAlbumDto.date_debut) newAlbum.date_debut = createAlbumDto.date_debut;
    if(createAlbumDto.date_fin)newAlbum.date_fin = createAlbumDto.date_fin;
    if(createAlbumDto.description)newAlbum.description = createAlbumDto.description;
    newAlbum.user = [user];
    const albumNew = await Album.save(newAlbum);

    return albumNew;
  }

  async findAll(): Promise<Album[] | undefined> {
    const allAlbums = await Album.find({ relations: { photos: true } });

    if (!allAlbums) throw new NotFoundException();
    return allAlbums;
  }
  async findOneNom(nom_album: string): Promise<Album[] | undefined> {
    const oneNom = await Album.find({
      where: {
        nom_album: nom_album,
      },
      relations: { user: true },
    });
    if (oneNom) {
      return oneNom;
    }
    return undefined;
  }
  async findOneDate(date_debut: string) {
    const oneDate = await Album.findOneBy({ date_debut });
    if (date_debut) {
      return oneDate;
    }
    return undefined;
  }
  async findOne(id: number) {
    const oneAlbum = await Album.findOneBy({ id });
    if (oneAlbum) {
      return oneAlbum;
    }
    return undefined;
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
    getUser: User,
  ): Promise<Album | undefined> {
    const updateAlbum = await Album.findOneBy({ id });
    const photo = await Photo.findOneBy({ id: updateAlbumDto.photosId });
    //updateAlbum.user = updateAlbum.user.push(getUser);
    updateAlbum.nom_album = updateAlbumDto.nom_album;
    updateAlbum.date_debut = updateAlbumDto.date_debut;
    updateAlbum.date_fin = updateAlbumDto.date_fin;
    updateAlbum.description = updateAlbumDto.description;
    updateAlbum.photos.push(photo);

    await updateAlbum.save();

    return updateAlbum;
  }

  async delete(id: number): Promise<Album | undefined> {
    const suppId = await Album.findOneBy({ id:id });
      
    await Album.remove(suppId);

    return suppId;
  }
}
