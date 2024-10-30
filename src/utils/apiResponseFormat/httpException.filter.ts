import {
    ExceptionFilter,
    Catch,
    HttpException,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { getStatus } from './statusDescription';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const responseBody = {
            statusCode: status,
            status: getStatus(status), // Add status description here
            message: exception.message || null,
            error: exception.getResponse()['error'] || null,
        };

        response.status(status).json(responseBody);
    }
}
