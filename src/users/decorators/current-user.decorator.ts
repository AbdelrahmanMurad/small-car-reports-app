import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        // data variable for passing
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)