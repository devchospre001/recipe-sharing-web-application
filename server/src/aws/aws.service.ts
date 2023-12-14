import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
  constructor(private configService: ConfigService) {}

  private AWS_S3_BUCKET = 'recipe-sharing-web-app-bucket';
  private s3 = new AWS.S3({
    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_S3_ACCESS_KEY_SECRET'),
  });

  async uploadFile(file) {
    console.log('devchosprez::: ', file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-central-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log('resko: ', s3Response);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
