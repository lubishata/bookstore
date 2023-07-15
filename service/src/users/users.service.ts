import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}
    
    findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    findById(id: number):Promise<User> {
        return this.userRepository.findOneOrFail({where: {id:id}});
    }

    findByEmail(email: string): Promise<User>{
        return this.userRepository.findOneOrFail({where: {email:email}});
    }

    create(user:UserDto): Promise<User> {
        const created = this.userRepository.create(user);
        return this.userRepository.save(created);
    }

    async update(id:number, updateUserDto:UserDto):Promise<User>{
        const user = await this.findById(id);
        return this.userRepository.save({
            ...user,
            ...updateUserDto,
        });
    }

    async remove(id:number): Promise<User>{
        const user = await this.findById(id);
        return this.userRepository.remove(user);
    }
}
