import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateRecipeDto, EditRecipeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { AWSService } from '../aws/aws.service';

// TODO: Add assertions for every method in RecipesService class.

@Injectable()
export class RecipesService {
  constructor(
    private awsService: AWSService,
    private prismaService: PrismaService,
  ) {}

  async createRecipe(
    userId: number,
    recipeDto: CreateRecipeDto,
    file: Express.Multer.File,
  ) {
    const { title, category, cuisine, instructions, keywords } = recipeDto;

    const image = await this.awsService.uploadFile(file);
    const imageLocation = image.Location;

    const recipe = await this.prismaService.recipe.create({
      data: {
        title,
        category,
        cuisine,
        instructions,
        keywords,
        image: imageLocation ?? null,
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

  async getRecipesForAllUsers() {
    return await this.prismaService.recipe.findMany();
  }

  async getRecipesForUser(userId: number) {
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
