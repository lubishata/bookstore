import * as bcrypt from 'bcrypt';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    return this.usersService
      .createUser({
        ...createUserDto,
        password: hash,
      })
      .catch(() => {
        throw new BadRequestException();
      });
  }

  @Post('/login')
  async findOne(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);

    return user && (await bcrypt.compare(createUserDto.password, user.password))
      ? user
      : null;
  }
}
