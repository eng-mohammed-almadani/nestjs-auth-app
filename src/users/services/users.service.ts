import {
    BadRequestException,
    Inject,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_MODEL')
        private usersModel: Model<Users>,
    ) {}

    async create(body: CreateUserDto) {
        const existsEmail = await this.usersModel.findOne({
            email: body.email,
        });
        if (existsEmail) {
            return new NotAcceptableException('The Email is exists');
        }
        const password = await bcrypt.hash(body.password, 10);

        const newUser = {
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: password,
            role: body.role,
        };

        const user = await this.usersModel.create(newUser);
        return user;
    }

    async findAll() {
        const users = await this.usersModel.find();
        return users;
    }

    async findOne(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Invalid user ID format');
        }

        const user = await this.usersModel.findById(id);

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        await this.findOne(id);
        const user = await this.usersModel.findByIdAndUpdate(
            id,
            updateUserDto,
            { new: true },
        );
        return user;
    }

    async remove(id: string) {
        await this.findOne(id);
        const user = await this.usersModel.findByIdAndDelete(id);
        return { message: 'Deleted Successfully' };
    }
}
