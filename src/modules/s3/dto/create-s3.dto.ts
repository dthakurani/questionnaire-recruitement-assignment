import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateS3Dto {
  @ApiProperty({
    description: 'Images need to be uploaded',
    required: true,
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}
