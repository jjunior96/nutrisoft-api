import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AllowAny } from '../custom-decorators/allow-any.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @AllowAny()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
