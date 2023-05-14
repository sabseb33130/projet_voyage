import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { Request, Post, UseGuards, Controller } from '@nestjs/common';
@Controller('auth/')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
