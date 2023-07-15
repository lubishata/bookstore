import { Controller, Body, Post, Get, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard/auth.guard';
import { SignInDto } from './dto/sign-in-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDTO: SignInDto){
        return this.authService.signIn(signInDTO.email, signInDTO.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req:any){
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    logout(@Request() req:any){
        return HttpStatus.OK;
    }
}
