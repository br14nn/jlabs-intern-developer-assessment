import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    default: 'root',
  })
  username: string;

  @ApiProperty({
    type: 'string',
    default: 'password',
  })
  password: string;
}
