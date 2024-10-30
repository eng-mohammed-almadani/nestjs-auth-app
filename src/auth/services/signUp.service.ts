import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { SignUpDto } from '../dto/signUp.dto';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
    constructor(
        @Inject('USERS_MODEL')
        private usersModel: Model<Users>,
        private jwtService: JwtService,
    ) {}

    async signUp(body: SignUpDto) {
        const existsEmail = await this.usersModel.findOne({
            email: body.email,
        });
        if (existsEmail) {
            return new NotAcceptableException('The Email is exists');
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const role = 'user';
        const payload = {
            email: body.email,
            role: role,
        };

        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });

        const newUser = {
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: hashedPassword,
            role: role,
            token: token,
        };

        const user = await this.usersModel.create(newUser);
        return { message: 'Signed Up Successfully', data: user };
    }
}
