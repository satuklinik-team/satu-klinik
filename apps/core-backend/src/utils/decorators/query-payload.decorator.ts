import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QueryPayload = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const queryPayload = request.headers['x-query-payload'] as
      | string
      | undefined;
    if (!queryPayload) return {};

    try {
      return JSON.parse(queryPayload);
    } catch (error) {
      return {};
    }
  },
);
