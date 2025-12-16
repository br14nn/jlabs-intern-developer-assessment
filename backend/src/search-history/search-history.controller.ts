import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';
import { CreateSearchHistoryDto } from './dto';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private searchHistoryService: SearchHistoryService) {}

  @Get()
  async getSearchHistory(@Headers('Authorization') authHeader: string) {
    return await this.searchHistoryService.getSearchHistory(authHeader);
  }

  @Post()
  async createSearchHistory(
    @Headers('Authorization') authHeader: string,
    @Body() createSearchHistoryDto: CreateSearchHistoryDto,
  ) {
    return await this.searchHistoryService.createSearchHistory(
      authHeader,
      createSearchHistoryDto,
    );
  }
}
