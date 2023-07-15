import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto/user.dto';

@Injectable()
export class UsersService {
    public users: UserDto[] = [];
    
    findAll():UserDto[]{
        return this.users;
    }

    findOne(id?: number, email?: string):UserDto {
        return this.users[0]
    }

    create(user:UserDto): UserDto {
        this.users.push(user);
        return user;
    }

    update(id:number, user:UserDto): UserDto{
        return user;
    }

    delete(id:number): UserDto{
        return this.users[0];
    }
}
