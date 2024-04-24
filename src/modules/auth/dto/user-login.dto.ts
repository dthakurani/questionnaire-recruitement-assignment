import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'pramudito@mailinator.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    example: 'Password@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class Tokens {
  @ApiProperty({ description: 'Access token', example: 'sample_access_token' })
  access_token: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'sample_refresh_token',
  })
  refresh_token: string;
}

class UserData {
  @ApiProperty({
    description: 'User ID',
    example: 'b3d56d4c-2a77-4aae-9231-1c05d8d54288',
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Pramudito Kartiko Lukito',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'pramudito@mailinator.com',
  })
  email: string;

  @ApiProperty({ description: 'User tokens', type: Tokens })
  tokens: Tokens;
}

export class LoginResponse {
  @ApiProperty({ description: 'API status', example: 200 })
  status: number;

  @ApiProperty({ description: 'User data', type: UserData })
  data: UserData;

  @ApiProperty({
    description: 'Response message',
    example: 'User logged in successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:03:09.935Z',
  })
  timeStamp: string;
}
