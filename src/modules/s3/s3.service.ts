import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { S3 } from 'aws-sdk';
import { CustomException } from 'src/utils/custom-exception';

@Injectable()
export class S3Service {
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly bucketName: string;
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.accessKeyId = this.configService.getOrThrow('aws.accessKeyId', {
      infer: true,
    });
    this.secretAccessKey = this.configService.getOrThrow(
      'aws.secretAccessKey',
      {
        infer: true,
      },
    );
    this.bucketName = this.configService.getOrThrow('aws.bucketName', {
      infer: true,
    });

    this.s3 = new S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }

  async s3Upload(file: any, name: string, mimetype: string) {
    const params = {
      Bucket: this.bucketName,
      Key: String(name),
      Body: file,
      // ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    const s3Response = await this.s3.upload(params).promise();
    return s3Response;
  }

  async create(files: any) {
    const awsResponses: any = [];
    if (!files?.files) {
      new CustomException().throwHttpError({
        message: 'Files are required!',
        status: HttpStatus.BAD_REQUEST,
        errorKey: 'files',
      });
    }

    for (const file of files.files) {
      const { originalname } = file;

      const response = await this.s3Upload(
        file.buffer,
        originalname,
        file.mimetype,
      );

      awsResponses.push(response);
    }
    return { data: awsResponses };
  }
}
