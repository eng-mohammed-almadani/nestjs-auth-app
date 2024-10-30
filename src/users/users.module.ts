import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './providers/users.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [...usersProviders, UsersService],
})
export class UsersModule {}
