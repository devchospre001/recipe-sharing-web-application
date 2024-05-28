import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AWSService } from './aws.service';

@Controller('aws')
export class AWSController {
  constructor(private readonly awsService: AWSService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsService.uploadFile(file);
  }
}
