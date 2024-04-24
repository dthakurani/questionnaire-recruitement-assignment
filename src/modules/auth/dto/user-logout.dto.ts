import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponse {
  @ApiProperty({ description: 'API status', example: 200 })
  status: number;

  @ApiProperty({ description: 'Response data', example: {} })
  data: {};

  @ApiProperty({
    description: 'Response message',
    example: 'User logged out successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:14:18.752Z',
  })
  timeStamp: string;
}
