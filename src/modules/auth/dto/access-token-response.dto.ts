import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class RefreshTokenData {
  @ApiProperty({
    description: 'Access token',
    example: 'sample_access_token',
  })
  access_token: string;
}

export class AccessTokenResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.OK })
  status: number;

  @ApiProperty({ description: 'Response data', type: RefreshTokenData })
  data: RefreshTokenData;

  @ApiProperty({ description: 'Response message', example: 'Ok' })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:07:04.287Z',
  })
  timeStamp: string;
}
