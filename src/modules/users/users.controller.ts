import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserResponse } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommonHelper } from '../../modules/common/common.helper';
import { Request, Response } from 'express';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly commonHelper: CommonHelper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ type: CreateUserResponse })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ) {
    try {
      await this.usersService.create(body);

      return this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'User created successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error('user create error :\n', new Date().toISOString(), error);
      }

      return this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
