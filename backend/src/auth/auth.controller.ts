import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/verify')
  async verify(@Headers('Authorization') authHeader: string) {
    return await this.authService.verify(authHeader);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
