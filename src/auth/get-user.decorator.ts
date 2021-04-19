import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * @description custom decorator.
 * This enables the decorated route to only get the user from the request object
 * This is handy if only the user object is needed instead of the full req object
 */
const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

export { GetUser };
