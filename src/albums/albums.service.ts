import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  async create(createAlbumDto: CreateAlbumDto): Promise<Album | undefined> {
    const newAlbum = new Album();
    newAlbum.nom_album = createAlbumDto.nom_album;
    await newAlbum.save();

    return newAlbum;
  }

  async findAll() {
    const allAlbums = await Album.find();
    return allAlbums;
  }
  async findOneNom(nom_album: string): Promise<Album | undefined> {
    const oneNom = await Album.findOneBy({ nom_album: nom_album });
    if (oneNom) {
      return oneNom;
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
  ): Promise<Album | undefined> {
    await Album.update(id, updateAlbumDto);
    const updateAlbum = await Album.findOneBy({ id });
    return updateAlbum;
  }

  async delete(id: number): Promise<Album | undefined> {
    const suppId = await Album.findOneBy({ id });
    await Album.remove(suppId);
    return suppId;
  }
}
