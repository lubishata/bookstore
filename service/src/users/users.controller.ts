import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() userDto:UserDto):Promise<User> {
        return this.usersService.create(userDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User>{
        return this.usersService.findById(id).catch(() => {
            throw new NotFoundException();
          });
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string): Promise<User>{
        return this.usersService.findByEmail(email).catch(() => {
            throw new NotFoundException();
          });
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() userDto:UserDto): Promise<User>{
        return this.usersService.update(+id, userDto).catch(() => {
            throw new NotFoundException();
          });
    }

    @Delete(':id')
    async remove(@Param('id') id:number):Promise<User>{
        return this.usersService.remove(+id).catch(() => {
            throw new NotFoundException();
          });
    }
}
