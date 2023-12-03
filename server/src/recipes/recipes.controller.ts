import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RecipesService } from './recipes.service';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async getRecipes(@GetUser('id') userId: number) {
    return this.recipesService.getRecipes(userId);
  }

  @Get('recipe/:id')
  getRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipesService.getRecipeById(userId, recipeId);
  }

  @Post('recipe/new')
  createRecipe(
    @GetUser('id') userId: number,
    @Body() recipeDto: CreateRecipeDto,
  ) {
    return this.recipesService.createRecipe(userId, recipeDto);
  }

  @Patch('recipe/:id')
  updateRecipe(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() recipeDto: EditRecipeDto,
  ) {
    return this.recipesService.updateRecipe(userId, recipeId, recipeDto);
  }

  @Delete('recipe/:id')
  deleteRecipe(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipesService.deleteRecipeById(userId, recipeId);
  }
}
