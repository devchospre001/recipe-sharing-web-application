import { ForbiddenException, Injectable } from '@nestjs/common';

import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateUser(userId: number, userDto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userDto,
      },
    });

    delete user.pwdHash;

    return user;
  }

  async getUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.pwdHash; // Maybe when retrieving an user, we can show password for updating purposes.

    return user;
  }

  async removeUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || user.id !== userId)
      throw new ForbiddenException('Access to user resources is forbidden.');

    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
