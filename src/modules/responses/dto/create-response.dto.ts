import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class ValueDto {
  @ApiProperty({
    description: 'Project question mapping Id',
    example: 'd8a989b3-68b3-4e1b-b891-7b7dc2ae49f8',
  })
  @IsNotEmpty()
  @IsUUID()
  projectQuestionMappingId: string;

  @ApiProperty({
    description: 'Text value for response',
    type: String,
    example: 'Sample text response',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'File URL after uploading to S3',
    example: [
      'https://s3.amazonaws.com/example/file1.jpg',
      'https://s3.amazonaws.com/example/file2.png',
    ],
  })
  @ValidateIf((o) => o.text === undefined)
  @IsNotEmpty()
  files: string[];
}

export class CreateResponseDto {
  @ApiProperty({
    description: 'Project Id',
    example: 'd8a989b3-68b3-4e1b-b891-7b7dc2ae49f8',
  })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({
    description: 'Responses value',
    type: ValueDto,
    isArray: true,
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ValueDto)
  values: ValueDto[];
}

export class CreateResponseUploadResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.CREATED })
  status: number;

  @ApiProperty({ description: 'Data of the response', example: {} })
  data: any;

  @ApiProperty({
    description: 'Response message',
    example: 'Response recorded successfully!',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T18:09:27.858Z',
  })
  timeStamp: string;
}
