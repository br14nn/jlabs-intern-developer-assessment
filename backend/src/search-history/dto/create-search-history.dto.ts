import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchHistoryDto {
  @ApiProperty({ type: 'string', default: '1.1.1.1' })
  ip_address: string;
}
