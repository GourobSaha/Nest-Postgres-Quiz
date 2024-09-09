import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class LoginAuthDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
}
