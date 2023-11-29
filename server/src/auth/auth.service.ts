import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  userSignup() {
    return {};
  }

  async userSignin(username: string, passKey: string) {
    const user = await this.usersService.findOneUser(username);
    if (user?.password !== passKey) throw new UnauthorizedException();

    const { password, ...result } = user;

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  restorePassword() {
    return {};
  }
}
