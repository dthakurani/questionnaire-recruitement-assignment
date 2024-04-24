import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProjectType } from '../projects.enum';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'project name', example: 'Testing Project' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'project city', example: 'Testing City' })
  city: string;

  @IsNotEmpty()
  @IsEnum(ProjectType)
  @ApiProperty({ description: 'project type', example: 'JEE' })
  type: ProjectType;
}
