import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProjectType } from '../projects.enum';
import { HttpStatus } from '@nestjs/common';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the project',
    type: String,
    example: 'Testing Project',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the city',
    type: String,
    example: 'Testing City',
  })
  city: string;

  @IsNotEmpty()
  @IsEnum(ProjectType)
  @ApiProperty({
    description: 'Type of the project',
    enum: ProjectType,
    example: 'JEE',
  })
  type: ProjectType;
}

class ProjectData {
  @ApiProperty({ description: 'Project name', example: 'Testing Project' })
  name: string;

  @ApiProperty({ description: 'City of the project', example: 'Testing City' })
  city: string;

  @ApiProperty({ description: 'Type of the project', example: 'JEE' })
  type: string;

  @ApiProperty({
    description: 'User ID associated with the project',
    example: 'b3d56d4c-2a77-4aae-9231-1c05d8d54288',
  })
  userId: string;

  @ApiProperty({
    description: 'Project ID',
    example: '85a839f0-3516-423c-a319-0886dc497a2f',
  })
  id: string;

  @ApiProperty({
    description: 'Timestamp of project creation',
    example: '2024-04-24T12:09:24.226Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp of project update',
    example: '2024-04-24T12:09:24.226Z',
  })
  updatedAt: string;

  @ApiProperty({ description: 'Timestamp of project deletion', example: null })
  deletedAt: string | null;
}

export class CreateProjectResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.CREATED })
  status: number;

  @ApiProperty({ description: 'Project data', type: ProjectData })
  data: ProjectData;

  @ApiProperty({
    description: 'Response message',
    example: 'Project created successfully!',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:39:24.435Z',
  })
  timeStamp: string;
}
