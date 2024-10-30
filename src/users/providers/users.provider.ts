import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/users.schema';

export const usersProviders = [
    {
        provide: 'USERS_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Users', UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
