import { ForbiddenException, Injectable } from '@nestjs/common';

import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateUser(userId: number, userDto: EditUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: userDto.email || user.email,
        firstName: userDto.firstName || user.firstName,
        lastName: userDto.lastName || user.lastName,
      },
    });
  }

  async getLoggedInUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.pwdHash;

    return user;
  }

  async removeUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.id !== userId) throw new ForbiddenException('Access to user resources is forbidden.');

    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
