import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService, 
        private jstService:JwtService){}

    async signIn(email:string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(undefined, email)
        if (user?.password !== pass){
            throw new UnauthorizedException();
        }
        const token_data = {
            id: user.id,
            email: user.email, 
            role: user.role
            };
        return {
            access_token: await this.jstService.signAsync(token_data),    
        }

    }

}
