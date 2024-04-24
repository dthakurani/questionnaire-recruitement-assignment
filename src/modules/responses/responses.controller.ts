import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Req,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import {
  CreateResponseDto,
  CreateResponseUploadResponse,
} from './dto/create-response.dto';
import { CommonHelper } from '../common/common.helper';
import { Request, Response } from 'express';
import {
  FindAllResponseDto,
  ResponsesFindResponse,
} from './dto/find-all-response.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Responses')
@Controller({
  path: 'responses',
  version: '1',
})
export class ResponsesController {
  constructor(
    private readonly responsesService: ResponsesService,
    private commonHelper: CommonHelper,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOkResponse({
    type: CreateResponseUploadResponse,
    description: 'Response for successful response recording',
  })
  @ApiOperation({ summary: 'Record responses for a project' })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateResponseDto,
  ) {
    try {
      const user = req['user'];

      await this.responsesService.create(user, body);

      return this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'Response recorded successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'response create error :\n',
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

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({
    type: ResponsesFindResponse,
    description: 'Response for finding responses',
  })
  @ApiOperation({ summary: 'Find responses for specific project' })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: FindAllResponseDto,
  ) {
    try {
      const user = req['user'];

      const data = await this.responsesService.findAll(user, query);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'response findAll error :\n',
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
