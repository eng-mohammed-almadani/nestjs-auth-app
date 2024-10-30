import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
    @IsEnum(['user', 'admin'])
    role: string;
}
