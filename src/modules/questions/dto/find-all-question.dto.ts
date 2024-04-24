import { ProjectType } from '../../projects/projects.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllQuestionDto {
  @IsOptional()
  @IsEnum(ProjectType)
  @ApiProperty({ description: 'project type', required: false })
  type: ProjectType;
}
