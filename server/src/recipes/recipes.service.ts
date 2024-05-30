import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateRecipeDto, EditRecipeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { AWSService } from '../aws/aws.service';

@Injectable()
export class RecipesService {
  constructor(
    private awsService: AWSService,
    private prismaService: PrismaService,
  ) {}

  async createRecipe(userId: number, recipeDto: CreateRecipeDto, file?: Express.Multer.File) {
    const { title, category, cuisine, instructions, keywords } = recipeDto;

    let image;
    let imageLocation;

    if (file) {
      image = await this.awsService.uploadFile(file);
      imageLocation = image.Location;
    }

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

  async getRecipeById(recipeId: number) {
    return await this.prismaService.recipe.findUniqueOrThrow({
      where: {
        id: recipeId,
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

    if (!recipe || recipe.userId !== userId) throw new ForbiddenException('Access to recipe resources is forbidden.');

    await this.prismaService.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    return {
      message: 'Recipe removed successfully',
    };
  }

  async updateRecipe(userId: number, recipeId: number, recipeDto: EditRecipeDto, file?: Express.Multer.File) {
    const recipe = await this.prismaService.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    let image;
    let imageLocation;

    if (file) {
      image = await this.awsService.uploadFile(file);
      imageLocation = image.Location;
    }

    if (!recipe || recipe.userId !== userId) throw new ForbiddenException('Access to recipe resources is forbidden.');

    return await this.prismaService.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        title: recipeDto.title || recipe.title,
        category: recipeDto.category || recipe.category,
        cuisine: recipeDto.cuisine || recipe.cuisine,
        instructions: recipeDto.instructions || recipe.instructions,
        keywords: recipeDto.instructions || recipe.instructions,
        image: imageLocation || recipe.image,
      },
    });
  }
}
