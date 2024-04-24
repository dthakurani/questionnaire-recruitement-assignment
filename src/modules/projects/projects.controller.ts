import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  CreateProjectResponse,
} from './dto/create-project.dto';
import { Request, Response } from 'express';
import { CommonHelper } from 'src/modules/common/common.helper';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/guards/auth.guard';
import { FindAllProjectDto, ProjectResponse } from './dto/find-all-project.dto';
import { FindProjectResponse } from './dto/find-one-project.dto';

@ApiBearerAuth('Bearer')
@ApiTags('Projects')
@Controller({
  path: 'projects',
  version: '1',
})
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private commonHelper: CommonHelper,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOkResponse({
    type: CreateProjectResponse,
    description: 'Project created response',
  })
  @ApiOperation({ summary: 'Create new Project' })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateProjectDto,
  ) {
    try {
      const user = req['user'];
      const data = await this.projectsService.create(user, body);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        message: 'Project created successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'project create error :\n',
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
    type: ProjectResponse,
    description: 'Project response',
  })
  @ApiOperation({ summary: 'List all projects' })
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: FindAllProjectDto,
  ) {
    try {
      const data = await this.projectsService.findAll(query);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'project findAll error :\n',
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
  @Get(':id')
  @ApiOkResponse({
    type: FindProjectResponse,
    description: 'Project found response',
  })
  @ApiOperation({ summary: 'Find a project' })
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const data = await this.projectsService.findOne(id);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error(
          'project findOne error :\n',
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
