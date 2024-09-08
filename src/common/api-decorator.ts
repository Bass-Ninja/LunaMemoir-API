import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiArrayResponse<T>(dto: Type<T>) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(dto) },
      },
    }),
  );
}

export function ApiDtoResponse<T>(dto: Type<T>) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        items: { $ref: getSchemaPath(dto) },
      },
    }),
  );
}
