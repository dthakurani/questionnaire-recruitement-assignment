import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { ProjectType } from '../projects.enum';
import { HttpStatus } from '@nestjs/common';

export class FindAllProjectDto {
  @IsOptional()
  @IsEnum(ProjectType)
  @ApiProperty({
    description: 'project type',
    enum: ProjectType,
    required: false,
  })
  type: ProjectType;
}

class Project {
  @ApiProperty({
    description: 'Project ID',
    example: '04e15328-8060-43c0-ad2e-25115e3d11bd',
  })
  id: string;

  @ApiProperty({ description: 'Project name', example: 'Testing Project' })
  name: string;

  @ApiProperty({ description: 'City of the project', example: 'Testing City' })
  city: string;

  @ApiProperty({ description: 'Type of the project', example: 'JEE' })
  type: string;
}

export class ProjectResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.OK })
  status: number;

  @ApiProperty({ description: 'Array of projects', type: [Project] })
  data: Project[];

  @ApiProperty({ description: 'Response message', example: 'Ok' })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:44:59.984Z',
  })
  timeStamp: string;
}
