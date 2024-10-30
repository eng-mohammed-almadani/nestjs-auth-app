import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
