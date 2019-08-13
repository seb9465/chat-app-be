import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

export const checkJwt: Function = (req: Request, res: Response, next: NextFunction) => {
    dotenv.config();
    const JWT_SECRET: string = process.env.JWT_SECRET;
    const token: string = req.headers['auth'] as string;
    // tslint:disable-next-line:typedef
    let jwtPayload;

    try {
        // tslint:disable-next-line:no-any
        jwtPayload = jwt.verify(token, JWT_SECRET) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // tslint:disable-next-line:no-magic-numbers
        res.status(401).send();

        return;
    }

    const { userId, username } = jwtPayload;
    // tslint:disable-next-line:typedef
    const newToken = jwt.sign({ userId, username }, JWT_SECRET, {
        expiresIn: '1h'
    });

    res.setHeader('token', newToken);

    next();
};
