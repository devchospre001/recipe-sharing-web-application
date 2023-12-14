import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { SigninUserDto, SignupUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signup(userDto: SignupUserDto) {
    try {
      const { username, password, email, firstName, lastName } = userDto;
      const pwdHash = await argon.hash(password);
      await this.prismaService.user.create({
        data: {
          username,
          pwdHash,
          email,
          firstName,
          lastName,
        },
      });

      return this.signin(userDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('User already exists');
      throw error;
    }
  }

  async signin(userDto: SigninUserDto) {
    const { username, password } = userDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new ForbiddenException('Incorrect username or password');

    const pwdMatched = await argon.verify(user.pwdHash, password);

    if (!pwdMatched)
      throw new ForbiddenException('Incorrect username or password');

    return this.signToken(user.id, user.username);
  }

  private async signToken(userId: number, username: string): Promise<string> {
    const payload = { sub: userId, username };
    return this.jwtService.signAsync(payload);
  }
}
