import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SearchService {
  async searcha(search: string): Promise<User[]> {
    const result = await User.find({
      where: [
        { pseudo: ILike(`%${search}%` || '') },
        { nom: ILike(`%${search}%` || '') },
      ],
    });
    const resultat = await Album.find({
      where: [
        {
          nom_album: ILike(`%${search}%` || ''),
        },
      ],
    });
    const total = result;
    console.log('test', total);

    return result;
  }
  async searchb(search: string): Promise<Album[]> {
    const resultat = await Album.find({
      where: [
        {
          nom_album: ILike(`%${search}%` || ''),
        },
      ],
    });
    const total = resultat;
    console.log('album', total);

    return resultat;
  }
}
