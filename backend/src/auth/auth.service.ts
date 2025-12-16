import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto';
import { IResponse } from 'types/response.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async verify(authHeader: string): Promise<IResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(
        authHeader.split('Bearer ')[1],
        {
          secret: process.env.JWT_SECRET,
        },
      );

      return {
        results: payload,
        error: false,
        message: 'authenticated',
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        results: null,
        error,
        message: 'Unauthorized',
      });
    }
  }

  async login(loginDto: LoginDto): Promise<IResponse> {
    try {
      const res = await this.prismaService.user.findFirst({
        where: {
          username: loginDto.username,
          password: loginDto.password,
        },
      });

      if (!res) throw new UnauthorizedException();

      const payload = { sub: res.id, username: res.username };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        results: {
          access_token: accessToken,
        },
        error: false,
        message: 'login successfully',
      };
    } catch (error) {
      if (error.status == 401) {
        throw new UnauthorizedException({
          results: null,
          error: error,
          message: 'incorrect login credentials',
        });
      }

      throw new BadRequestException({
        results: null,
        error: error,
        message: 'login error',
      });
    }
  }
}
