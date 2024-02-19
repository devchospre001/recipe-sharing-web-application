import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('currentLoggedInUser')
  async getCurrentLoggedInUser(@GetUser('id') userId: number) {
    return await this.usersService.getLoggedInUser(userId);
  }
}
