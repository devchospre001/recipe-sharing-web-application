import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const httpContext = ctx.switchToHttp();
  const request: Express.Request = httpContext.getRequest();

  if (data) return request.user[data];
  return request.user;
});
