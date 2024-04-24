import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { CreateS3Dto, S3UploadResponse } from './dto/create-s3.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { CommonHelper } from '../common/common.helper';
import { AuthGuard } from '../guards/auth.guard';

@ApiBearerAuth('Bearer')
@ApiTags('S3')
@Controller({
  path: 's3',
  version: '1',
})
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    private commonHelper: CommonHelper,
  ) {}

  @UseGuards(AuthGuard)
  @Post('file-upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: S3UploadResponse,
    description: 'S3 upload response',
  })
  @ApiOperation({ summary: 'Upload files to the s3 storage' })
  @ApiBody({ type: CreateS3Dto })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles()
    files: {
      files: Express.Multer.File[];
    },
  ) {
    try {
      const data = await this.s3Service.create(files);

      return this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      if (!error.errorMessage) {
        console.error('s3 create error :\n', new Date().toISOString(), error);
      }

      return this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
