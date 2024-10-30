import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dto/login.dto';
import { TransformInterceptor } from 'src/utils/apiResponseFormat/response.interceptor';

@Controller('login')
@UseInterceptors(TransformInterceptor)
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(
        @Body(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
        )
        loginDto: LoginDto,
    ) {
        return this.loginService.login(loginDto);
    }
}
