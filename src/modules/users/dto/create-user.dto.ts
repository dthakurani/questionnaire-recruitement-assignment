import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Pramudito Kartiko Lukito',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'pramudito@mailinator.com',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password@123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~])[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,20}$/,
    {
      message:
        'Password must contain at least one letter, one number, and one special symbol',
    },
  )
  password: string;
}

export class CreateUserResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.CREATED })
  status: number;

  @ApiProperty({ description: 'Data object' })
  data: {};

  @ApiProperty({
    description: 'Response message',
    example: 'User created successfully!',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T16:52:30.615Z',
  })
  timeStamp: string;
}
