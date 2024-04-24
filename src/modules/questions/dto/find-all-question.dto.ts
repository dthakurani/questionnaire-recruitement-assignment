import { ProjectType } from '../../projects/projects.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllQuestionDto {
  @IsOptional()
  @IsEnum(ProjectType)
  @ApiProperty({
    description: 'project type',
    enum: ProjectType,
    required: false,
  })
  type: ProjectType;
}

class Question {
  @ApiProperty({
    description: 'Question ID',
    example: '9aef6683-ebde-40ef-9858-0dfd08a83609',
  })
  id: string;

  @ApiProperty({
    description: 'Description of the question',
    example: 'Company or organization name',
  })
  description: string;

  @ApiProperty({ description: 'Type of question', example: 'JEE' })
  type: string;
}

export class QuestionResponse {
  @ApiProperty({ description: 'API status', example: 200 })
  status: number;

  @ApiProperty({ description: 'Array of questions', type: [Question] })
  data: Question[];

  @ApiProperty({ description: 'Response message', example: 'Ok' })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:29:59.481Z',
  })
  timeStamp: string;
}
