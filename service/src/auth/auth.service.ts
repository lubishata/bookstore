import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interface/access-token.interface';
import { UserPayload } from './interface/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    return user && (await bcrypt.compare(password, user.password))
      ? user
      : null;
  }

  async login(user: UserPayload): Promise<AccessToken> {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
