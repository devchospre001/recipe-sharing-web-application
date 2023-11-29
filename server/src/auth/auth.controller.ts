import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    userSignup() {
        return this.authService.userSignup();
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    userSignin(@Body() signinDTO: Record<string, string>) {
        return this.authService.userSignin(signinDTO.username, signinDTO.password);
    }

    @Post('forgot-password')
    restorePassword() {
        return this.authService.restorePassword();
    }
}