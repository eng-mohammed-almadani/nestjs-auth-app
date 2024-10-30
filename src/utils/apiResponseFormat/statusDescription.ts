import { HttpStatus } from '@nestjs/common';

const StatusDescription: Record<number, string> = {
    [HttpStatus.CONTINUE]: 'Continue',
    [HttpStatus.SWITCHING_PROTOCOLS]: 'Switching Protocols',
    [HttpStatus.PROCESSING]: 'Processing',
    [HttpStatus.OK]: 'OK',
    [HttpStatus.CREATED]: 'Resource has been created.',
    [HttpStatus.ACCEPTED]: 'Request has been accepted for processing.',
    [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',
    [HttpStatus.NO_CONTENT]:
        'Request was successful but there is no content to return.',
    [HttpStatus.RESET_CONTENT]: 'Reset Content',
    [HttpStatus.PARTIAL_CONTENT]: 'Partial Content',
    [HttpStatus.MOVED_PERMANENTLY]: 'Moved Permanently',
    [HttpStatus.FOUND]: 'Found',
    [HttpStatus.SEE_OTHER]: 'See Other',
    [HttpStatus.NOT_MODIFIED]: 'Not Modified',
    [HttpStatus.TEMPORARY_REDIRECT]: 'Temporary Redirect',
    [HttpStatus.PERMANENT_REDIRECT]: 'Permanent Redirect',
    [HttpStatus.BAD_REQUEST]: 'The request was malformed or invalid.',
    [HttpStatus.UNAUTHORIZED]:
        'Authentication is required and has failed or has not yet been provided.',
    [HttpStatus.PAYMENT_REQUIRED]: 'Payment Required',
    [HttpStatus.FORBIDDEN]: 'Access to the requested resource is forbidden.',
    [HttpStatus.NOT_FOUND]: 'The requested resource could not be found.',
    [HttpStatus.METHOD_NOT_ALLOWED]:
        'The request method is not supported for the requested resource.',
    [HttpStatus.NOT_ACCEPTABLE]: 'Not Acceptable',
    [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: 'Proxy Authentication Required',
    [HttpStatus.REQUEST_TIMEOUT]: 'Request Timeout',
    [HttpStatus.CONFLICT]: 'There was a conflict with the request.',
    [HttpStatus.GONE]: 'The requested resource is no longer available.',
    [HttpStatus.LENGTH_REQUIRED]: 'Length Required',
    [HttpStatus.PRECONDITION_FAILED]: 'Precondition Failed',
    [HttpStatus.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
    [HttpStatus.URI_TOO_LONG]: 'URI Too Long',
    [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
    [HttpStatus.EXPECTATION_FAILED]: 'Expectation Failed',
    [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [HttpStatus.FAILED_DEPENDENCY]: 'Failed Dependency',
    [HttpStatus.PRECONDITION_REQUIRED]: 'Precondition Required',
    [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',
    [HttpStatus.INTERNAL_SERVER_ERROR]:
        'The server encountered an unexpected condition.',
    [HttpStatus.NOT_IMPLEMENTED]: 'Not Implemented',
    [HttpStatus.BAD_GATEWAY]: 'Bad Gateway',
    [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway Timeout',
    [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP Version Not Supported',
};

export function getStatus(statusCode: number): string {
    return StatusDescription[statusCode] || 'Unknown Status Code';
}
