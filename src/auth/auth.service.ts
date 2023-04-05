import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsersService from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user === null) {
      throw new UnauthorizedException(
        'Compte inexistant ou votre mot de passe ou votre identifiant est incorrect !! ',
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.pseudo, sub: user.id };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
