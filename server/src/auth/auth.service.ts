import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SigninUserDto, SignupUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signup(userDto: SignupUserDto) {
    try {
      const { username, password, email, firstName, lastName } = userDto;
      const pwdHash = await argon.hash(password);
      const user = await this.prismaService.user.create({
        data: {
          username,
          pwdHash,
          email,
          firstName,
          lastName,
        },
      });

      // since we don't want to return hashed password as a result, we can pop it out.
      delete user.pwdHash;

      return user;
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
      } as any,
    });

    if (!user) throw new ForbiddenException('Incorrect username or password');

    const pwdMatched = await argon.verify(user.pwdHash, password);

    if (!pwdMatched)
      throw new ForbiddenException('Incorrect username or password');

    delete user.pwdHash;

    return user;
  }

  // TODO: Should use later.
  // async validateUser(credentialsDto): Promise<any> {
  //   const { username, password } = credentialsDto;

  //   const salt = await genSalt();
  //   const user = await this.usersService.findOneUser(username);
  //   const passwordHash = await hash(password, salt);

  //   if (user && passwordHash) {
  //     return user;
  //   }
  //   return null;
  // }

  // async signInUser(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   const access_token = this.jwtService.sign(payload);
  //   return {
  //     access_token,
  //   };
  // }
}
