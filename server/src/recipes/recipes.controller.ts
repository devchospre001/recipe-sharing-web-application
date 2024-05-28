import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RecipesService } from './recipes.service';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async getRecipesForAllUsers() {
    return await this.recipesService.getRecipesForAllUsers();
  }

  @Get('my-recipes')
  async getRecipesForUser(@GetUser('id') userId: number) {
    return await this.recipesService.getRecipesForUser(userId);
  }

  @Get('recipe/:id')
  async getRecipeById(@GetUser('id') @Param('id', ParseIntPipe) recipeId: number) {
    return await this.recipesService.getRecipeById(recipeId);
  }

  @Post('recipe/new')
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(@GetUser('id') userId: number, @Body() recipeDto: CreateRecipeDto, @UploadedFile() file: Express.Multer.File) {
    return await this.recipesService.createRecipe(userId, recipeDto, file);
  }

  @Patch('recipe/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateRecipe(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() recipeDto: EditRecipeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.recipesService.updateRecipe(userId, recipeId, recipeDto, file);
  }

  @Delete('recipe/:id')
  async deleteRecipe(@GetUser('id') userId: number, @Param('id', ParseIntPipe) recipeId: number) {
    return await this.recipesService.deleteRecipeById(userId, recipeId);
  }
}
