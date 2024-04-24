import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindAllResponseDto {
  @ApiProperty({
    description: 'Project Id',
    example: 'f3e2fd88-1f22-4a79-ae10-6d63252cb34e',
  })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}

class ResponseValue {
  @ApiProperty({
    description: 'Text value for response',
    example: 'Testing Text',
  })
  text: string;

  @ApiProperty({
    description: 'Array of file URLs after uploading to S3',
    example: [
      'https://questionnaire-assignment.s3.amazonaws.com/disease-detection.png',
    ],
  })
  files: string[];
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

class ProjectQuestionMapping {
  @ApiProperty({
    description: 'Project Question Mapping ID',
    example: '9aef6683-ebde-40ef-9858-0dfd08a83609',
  })
  id: string;

  @ApiProperty({ description: 'question', type: Question })
  question: Question;
}

class Response {
  @ApiProperty({
    description: 'Response ID',
    example: '9aef6683-ebde-40ef-9858-0dfd08a83609',
  })
  id: string;

  @ApiProperty({ description: 'value', type: ResponseValue })
  value: ResponseValue;

  @ApiProperty({
    description: 'project question mapping',
    type: ProjectQuestionMapping,
  })
  projectQuestionMapping: ProjectQuestionMapping;
}

class ResponseData {
  @ApiProperty({
    description: 'project details',
    type: Project,
  })
  project: Project;

  @ApiProperty({
    description: 'Array of responses',
    type: [Response],
  })
  responses: Response[];
}

export class ResponsesFindResponse {
  @ApiProperty({
    description: 'Status code of the response',
    example: HttpStatus.OK,
  })
  status: number;

  @ApiProperty({ description: 'Data returned from the request' })
  data: ResponseData;

  @ApiProperty({
    description: 'Message indicating the result of the operation',
    example: 'Ok',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T18:26:53.419Z',
  })
  timeStamp: string;
}
