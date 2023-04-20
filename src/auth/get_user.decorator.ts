import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import User from '../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (_payload, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req', req.user);

    return req.user;
  },
);
