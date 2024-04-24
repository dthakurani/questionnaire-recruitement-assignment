import { QuestionType } from '../question.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllQuestionDto {
  @IsOptional()
  @IsEnum(QuestionType)
  @ApiProperty({ description: 'question type', required: false })
  type: QuestionType;
}
