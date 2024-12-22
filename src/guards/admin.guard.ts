import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        if (!request.currentUser) {
            console.log('No current user found in request');
            throw new UnauthorizedException('User not authenticated');
        }

        if (!request.currentUser.admin) {
            console.log('User is not an admin:', request.currentUser);
            throw new UnauthorizedException('User does not have admin privileges');
        }

        return true;
    }
}