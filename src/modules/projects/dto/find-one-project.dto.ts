import { HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({
    description: 'User ID',
    example: 'f74f93ed-0d68-4fce-a944-f8db42b82efd',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'Test User' })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'testuser@mailinator.com',
  })
  email: string;
}

class Question {
  @ApiProperty({
    description: 'Question ID',
    example: '598cdfe0-2da4-44cc-8917-8bd7f8a852b1',
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

class ProjectQuestion {
  @ApiProperty({
    description: 'ID of the project question',
    example: '598cdfe0-2da4-44cc-8917-8bd7f8a852b1',
  })
  id: string;

  @ApiProperty({
    description: 'Question associated with the project',
    type: Question,
  })
  question: Question;
}

class FindProjectData {
  @ApiProperty({
    description: 'Project ID',
    example: '04e15328-8060-43c0-ad2e-25115e3d11bd',
  })
  id: string;

  @ApiProperty({ description: 'Project name', example: 'Testing Project' })
  name: string;

  @ApiProperty({ description: 'Type of the project', example: 'JEE' })
  type: string;

  @ApiProperty({ description: 'User associated with the project', type: User })
  user: User;

  @ApiProperty({
    description: 'Array of project questions',
    type: [ProjectQuestion],
  })
  projectQuestions: ProjectQuestion[];
}

export class FindProjectResponse {
  @ApiProperty({ description: 'API status', example: HttpStatus.OK })
  status: number;

  @ApiProperty({ description: 'Project data', type: FindProjectData })
  data: FindProjectData;

  @ApiProperty({ description: 'Response message', example: 'Ok' })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: '2024-04-24T17:48:07.748Z',
  })
  timeStamp: string;
}
