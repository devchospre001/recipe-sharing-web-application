import { Module } from '@nestjs/common';

import { AWSController } from './aws.controller';
import { AWSService } from './aws.service';

@Module({
  controllers: [AWSController],
  providers: [AWSService],
  exports: [AWSService],
})
export class AWSModule {}
