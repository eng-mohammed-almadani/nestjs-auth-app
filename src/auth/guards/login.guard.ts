import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './roles.decorator';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {}
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = (request.headers.authorization || '   ').split(' ', 2)[1];

        if (!token) {
            throw new UnauthorizedException('Please Login');
        }

        const payload = await this.jwtService
            .verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })
            .catch(() => {
                throw new UnauthorizedException('Expired Token');
            });

        if (roles.includes(payload.role.toLowerCase())) {
            return true;
        } else {
            throw new UnauthorizedException('You Dont have role to do that');
        }
    }
}
