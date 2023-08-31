import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SearchService {
  async searcha(search: string): Promise<User[]> {
    const result = await User.find({
      where: [{ pseudo: ILike(`%${search}%` || '') }],
    });

    return result;
  }
  async searchb(search: string): Promise<User[]> {
    const resulat = await User.find({
      where: [{ nom: ILike(`%${search}%` || '') }],
    });

    return resulat;
  }
}
