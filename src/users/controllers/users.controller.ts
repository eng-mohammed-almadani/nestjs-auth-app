import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { TransformInterceptor } from 'src/utils/apiResponseFormat/response.interceptor';
import { LoginGuard } from 'src/auth/guards/login.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('users')
@UseGuards(LoginGuard)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(['admin'])
    @Post()
    create(
        @Body(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
        )
        createUserDto: CreateUserDto,
    ) {
        return this.usersService.create(createUserDto);
    }

    @Roles(['admin'])
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Roles(['admin', 'user'])
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Roles(['admin'])
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body(
            new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
        )
        updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Roles(['admin'])
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
