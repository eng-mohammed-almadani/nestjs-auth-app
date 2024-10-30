import * as monggose from 'mongoose';

export const UserSchema = new monggose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    token: { type: String },
});
