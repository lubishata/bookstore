import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() user:UserDto):UserDto {
        return this.usersService.create(user);
    }

    @Get()
    findAll(): UserDto[] {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): UserDto{
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() user:UserDto){
        return this.usersService.update(+id, user);
    }

    @Delete(':id')
    delete(@Param('id') id:number):UserDto{
        return this.usersService.delete(+id);
    }
}
