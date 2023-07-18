import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './interface/auth-request.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { HasRoles } from './guard/has-roles.decorator';
import { Role } from './enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    return req.user;
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  onlyAdmin(@Req() req: AuthRequest) {
    return req.user;
  }

  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  onlyUser(@Req() req: AuthRequest) {
    return req.user;
  }
}
