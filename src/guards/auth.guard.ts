import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        /*
        Now inside of here, we need to take a look at that incoming request and then we can decide whether or not to allow the request through.
        So in our case, we want to reject the request if a user is not signed in. 
        So we're going to use the presence of a user ID property on the user's session to decide whether or not they are signed in.
        */
        const request = context.switchToHttp().getRequest()
        return request.session.userId;
    }
}