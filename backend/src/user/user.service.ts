import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      const res = await this.prisma.user.findMany();

      console.log('hello world');

      return {
        results: res,
        error: false,
        message: 'get all users successfully',
      };
    } catch (error: any) {
      throw new BadRequestException({
        results: null,
        error: { ...error },
        message: 'failed to get all users',
      });
    }
  }
}
