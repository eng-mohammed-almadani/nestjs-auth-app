import { IsEmail, IsEnum, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
