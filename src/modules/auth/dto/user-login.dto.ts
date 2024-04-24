import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';

export class UserLoginDto {
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
    description: 'User password',
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
