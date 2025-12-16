import { Module } from '@nestjs/common';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
})
export class SearchHistoryModule {}
