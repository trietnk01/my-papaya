import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.getAllAndOverride("isPublic", [
        context.getHandler(),
        context.getClass()
      ]);
      if (isPublic) {
        return true;
      }
      return super.canActivate(context);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
