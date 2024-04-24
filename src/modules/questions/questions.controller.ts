import {
  Controller,
  Get,
  Req,
  Res,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindAllQuestionDto,
  QuestionResponse,
} from './dto/find-all-question.dto';
import { CommonHelper } from '../common/common.helper';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@ApiBearerAuth('Bearer')
@ApiTags('Questions')
@Controller({
  path: 'questions',
  version: '1',
})
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private commonHelper: CommonHelper,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: QuestionResponse,
    description: 'Question response',
  })
  @ApiOperation({ summary: 'List all questions' })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: FindAllQuestionDto,
  ) {
    try {
      const data = await this.questionsService.findAll(query);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'question findAll error :\n',
          new Date().toISOString(),
          error,
        );
      }

      return this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
