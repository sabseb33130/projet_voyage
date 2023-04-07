import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'pseudo' });
  }

  async validate(username: string, password: string): Promise<any> {
    const check = await User.find({ where: { pseudo: username } });

    if (!check) {
      throw new UnauthorizedException();
    }
    const user = await this.authService.validateUser(username, password);
    if (!user == undefined || user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
