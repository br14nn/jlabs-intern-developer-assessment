import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IResponse } from 'types/response.type';
import { CreateSearchHistoryDto } from './dto';

@Injectable()
export class SearchHistoryService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getSearchHistory(authHeader: string): Promise<IResponse> {
    try {
      const user = await this.authService.verify(authHeader);
      const res = await this.prismaService.searchHistory.findMany({
        where: {
          id: user.results.sub,
        },
      });

      return {
        results: res,
        error: false,
        message: 'get search history successfully',
      };
    } catch (error) {
      throw new BadRequestException({
        results: null,
        error,
        message: 'failed to get search history',
      });
    }
  }

  async createSearchHistory(
    authHeader: string,
    createSearchHistoryDto: CreateSearchHistoryDto,
  ): Promise<IResponse> {
    try {
      const user = await this.authService.verify(authHeader);
      const res = await this.prismaService.searchHistory.create({
        data: {
          ip_address: createSearchHistoryDto.ip_address,
          userId: user.results.sub,
        },
      });

      return {
        results: res,
        error: false,
        message: 'create search history successfully',
      };
    } catch (error) {
      throw new BadRequestException({
        results: null,
        error,
        message: 'failed to create search history',
      });
    }
  }
}
