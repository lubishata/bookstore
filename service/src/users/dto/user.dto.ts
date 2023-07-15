import {IsNumber, IsEmail, IsString, IsInt} from "class-validator";

export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    role: number;

}
