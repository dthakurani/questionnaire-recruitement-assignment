import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { ProjectType } from '../projects.enum';

export class FindAllProjectDto {
  @IsOptional()
  @IsEnum(ProjectType)
  @ApiProperty({ description: 'project type', required: false })
  type: ProjectType;
}
