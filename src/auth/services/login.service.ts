import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { Model } from 'mongoose';
import { Users } from 'src/users/interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
    constructor(
        @Inject('USERS_MODEL')
        private usersModel: Model<Users>,
        private jwtService: JwtService,
    ) {}

    async login(body: LoginDto) {
        const { email, password } = body;
        const user = await this.usersModel.findOne({ email });

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        const hashedPassword = user.password;
        const isMatched = await bcrypt.compare(password, hashedPassword);

        if (!isMatched) {
            throw new NotFoundException('The Password Is Not Correct');
        }

        const payload = {
            email: user.email,
            role: user.role,
        };

        user.token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });

        return { message: 'Login Successfully', data: user };
    }
}
