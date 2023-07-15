import {IsNumber, IsEmail, IsString, IsInt} from "class-validator";

export class UserDto {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    role: number;

}
