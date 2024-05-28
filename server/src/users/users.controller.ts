import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { EditUserDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('currentLoggedInUser')
  async getCurrentLoggedInUser(@GetUser('id') userId: number) {
    return await this.usersService.getLoggedInUser(userId);
  }

  @Patch('/:id')
  async updateUser(@GetUser('id') @Param('id') userId: number, @Body() user: EditUserDto) {
    return await this.usersService.updateUser(userId, user);
  }
}
