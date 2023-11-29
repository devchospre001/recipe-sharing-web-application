import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt } from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentialsDto): Promise<any> {
    const { username, password } = credentialsDto;

    const salt = await genSalt();
    const user = await this.usersService.findOneUser(username);
    const passwordHash = await hash(password, salt);

    if (user && passwordHash) {
      return user;
    }
    return null;
  }

  async signInUser(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }
}
