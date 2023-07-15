import {IsNumber, IsEmail, IsString, IsInt} from "class-validator";
export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
