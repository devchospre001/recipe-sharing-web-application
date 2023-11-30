import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninUserDto, SignupUserDto } from './dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  // @UseGuards(LocalAuthGuard)
  // @Post('sign-in')
  // async signInUser(@Request() req: any) {
  //   return this.authService.signInUser(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
