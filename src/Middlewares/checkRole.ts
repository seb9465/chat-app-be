import { Request, Response, NextFunction } from 'express';

export const checkRole: Function = (roles: Array<String>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get user ID
        const id: string = res.locals.jwtPayload.userId;

        // Get user role from DB
        // TODO : User.getUserById()

        // Check if the user's role is in the list
        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            // tslint:disable-next-line:no-magic-numbers
            res.status(401).send();
        }
    };
};
