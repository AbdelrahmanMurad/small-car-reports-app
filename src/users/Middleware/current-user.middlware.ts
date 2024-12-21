import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('Middleware is running...');

        // Debug the session object
        console.log('Session:', req.session);

        const { userId } = req.session || {};
        console.log('User ID:', userId);

        if (userId) {
            try {
                const user = await this.usersService.findUserById(userId);
                req.currentUser = user;
                console.log('Current User:', user);
            } catch (error) {
                console.error('Error fetching user:', error);
                req.currentUser = null;
            }
        } else {
            req.currentUser = null; // Ensure it's explicitly set
        }

        next();
    }
}