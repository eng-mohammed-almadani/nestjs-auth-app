import { Module } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { SignUpService } from './services/signUp.service';
import { SignUpController } from './controllers/signUp.controller';
import { LoginController } from './controllers/login.controller';
import { usersProviders } from 'src/users/providers/users.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
        }),
    ],

    controllers: [LoginController, SignUpController],
    providers: [...usersProviders, LoginService, SignUpService],
})
export class AuthModule {}
