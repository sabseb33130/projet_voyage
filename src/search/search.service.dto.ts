import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ILike } from 'typeorm';

@Injectable()
export class SearchService {
  async searcha(search: string): Promise<User[]> {
    const result = await User.find({
      where: [{ pseudo: ILike(`%${search}%` || '') }],
    });
    console.log('result', result);

    return result;
  }
}
