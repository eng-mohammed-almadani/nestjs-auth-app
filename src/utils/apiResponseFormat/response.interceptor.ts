import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { getStatus } from './statusDescription';
export interface Response<T> {
    statusCode: number;
    status: string;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    constructor(private reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        let statusCode = context.switchToHttp().getResponse().statusCode;
        return next.handle().pipe(
            map((data) => ({
                statusCode: data?.status || statusCode,
                status: getStatus(data?.status || statusCode),
                message: data?.message || '',
                data: data?.data || data || '',
            })),
        );
    }
}
