import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto, roleName: string) {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      return null;
    }

    const user = this.userRepository.create(createUserDto);

    user.roles = [role];

    return this.userRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.create(createUserDto, 'USER');
  }

  async createAdmin(createUserDto: CreateUserDto) {
    return this.create(createUserDto, 'ADMIN');
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        roles: true,
      },
    });
  }
}
