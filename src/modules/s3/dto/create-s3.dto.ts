import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateS3Dto {
  @ApiProperty({
    description: 'Images need to be uploaded',
    required: true,
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}

class S3UploadData {
  @ApiProperty({
    description: 'ETag of the uploaded file',
    example: '"4c2336a27a8eafbf19f525013f03e8bc"',
  })
  ETag: string;

  @ApiProperty({
    description: 'Server-side encryption used',
    example: 'AES256',
  })
  ServerSideEncryption: string;

  @ApiProperty({
    description: 'URL of the uploaded file',
    example:
      'https://questionnaire-assignment.s3.amazonaws.com/disease-detection.png',
  })
  Location: string;

  @ApiProperty({
    description: 'Key of the uploaded file',
    example: 'disease-detection.png',
  })
  key: string;

  @ApiProperty({
    description: 'Same as "key"',
    example: 'disease-detection.png',
  })
  Key: string;

  @ApiProperty({
    description: 'Name of the S3 bucket',
    example: 'questionnaire-assignment',
  })
  Bucket: string;
}

export class S3UploadResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.CREATED })
  status: number;

  @ApiProperty({
    description: 'Array of uploaded file details',
    type: [S3UploadData],
  })
  data: S3UploadData[];

  @ApiProperty({ description: 'Response message', example: 'Ok' })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T10:58:27.400Z',
  })
  timeStamp: string;
}
