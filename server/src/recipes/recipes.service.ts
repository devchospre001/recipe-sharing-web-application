import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateRecipeDto, EditRecipeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

// TODO: Add assertions for every method in RecipesService class.

@Injectable()
export class RecipesService {
  constructor(private prismaService: PrismaService) {}

  async createRecipe(userId: number, recipeDto: CreateRecipeDto) {
    const { title, category, cuisine, instructions, keywords, image } =
      recipeDto;
    const recipe = await this.prismaService.recipe.create({
      data: {
        title,
        category,
        cuisine,
        instructions,
        keywords,
        image,
        userId,
      },
    });

    return recipe;
  }

  async getRecipeById(userId: number, recipeId: number) {
    return await this.prismaService.recipe.findFirst({
      where: {
        id: recipeId,
        userId,
      },
    });
  }

  async getRecipes(userId: number) {
    return await this.prismaService.recipe.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteRecipeById(userId: number, recipeId: number) {
    const recipe = await this.prismaService.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('Access to recipe resources is forbidden.');

    await this.prismaService.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    return {
      message: 'Recipe removed successfully',
    };
  }

  async updateRecipe(
    userId: number,
    recipeId: number,
    recipeDto: EditRecipeDto,
  ) {
    const recipe = await this.prismaService.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('Access to recipe resources is forbidden.');

    return this.prismaService.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...recipeDto,
      },
    });
  }
}
