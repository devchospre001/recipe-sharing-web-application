import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninUserDto, SignupUserDto } from './dto';
// import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signup(@Body() userDto: SignupUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('sign-in')
  signin(@Body() userDto: SigninUserDto) {
    return this.authService.signin(userDto);
  }

  // @UseGuards(RefreshTokenGuard)
  // @Post('refresh')
  // async refreshToken(@Request() user) {
  //   return this.authService.refreshToken(user);
  // } TODO: Reimplement this.
}
