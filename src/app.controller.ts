import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('/auth/login')
  async login(@Body() user: { username: string; password: string }) {
    return this.authService.login(user);
  }
}
