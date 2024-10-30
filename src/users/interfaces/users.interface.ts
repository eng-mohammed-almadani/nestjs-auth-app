import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Users extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    token: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
