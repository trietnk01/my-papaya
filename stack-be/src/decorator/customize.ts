import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RESPONSE_MESSAGE = "response_message";
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE, message);
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
