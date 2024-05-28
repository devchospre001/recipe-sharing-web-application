import { Module } from '@nestjs/common';

import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { AWSModule } from 'src/aws/aws.module';

@Module({
  imports: [AWSModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipeModule {}
