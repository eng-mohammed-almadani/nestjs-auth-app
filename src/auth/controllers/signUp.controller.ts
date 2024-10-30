import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { SignUpService } from '../services/signUp.service';
import { SignUpDto } from '../dto/signUp.dto';
import { TransformInterceptor } from 'src/utils/apiResponseFormat/response.interceptor';

@Controller('sign-up')
@UseInterceptors(TransformInterceptor)
export class SignUpController {
    constructor(private readonly signUpService: SignUpService) {}

    @Post()
    signUp(
        @Body(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
        )
        signUpDto: SignUpDto,
    ) {
        return this.signUpService.signUp(signUpDto);
    }
}
