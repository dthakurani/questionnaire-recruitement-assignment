import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { CommonHelper } from '../common/common.helper';
import { Request, Response } from 'express';
import { FindAllResponseDto } from './dto/find-all-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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

  @Post()
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

  @Get()
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
